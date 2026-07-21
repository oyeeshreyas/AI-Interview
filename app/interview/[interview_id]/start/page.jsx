"use client";
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Mic, Phone, Timer } from 'lucide-react';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Vapi from "@vapi-ai/web";
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';
import axios from 'axios';
import { supabase } from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const AvatarViewer = dynamic(
  () => import('./_components/AvatarViewer'),
  { ssr: false } // Prevents SSR-related errors with Three.js
);


function StartInterview() {
    const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
    const [activeUser, setActiveUser] = useState(false);
    const [conversation, setConversation] = useState();
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { interview_id } = useParams();
    const router = useRouter();
    const videoRef = useRef(null);
    const vapiRef = useRef(null);

    const callStartedRef = useRef(false);

    // Initialize Vapi only once when mounted
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Filter non-fatal Daily.js WebRTC audio processing warnings so Next.js dev overlay does not pop up red errors mid-call
            const originalConsoleError = console.error;
            console.error = (...args) => {
                if (typeof args[0] === 'string' && args[0].includes('Ignoring settings for browser- or platform-unsupported input processor')) {
                    console.warn(...args);
                    return;
                }
                originalConsoleError.apply(console, args);
            };

            if (!vapiRef.current) {
                vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
                setMounted(true);
            }
        }
    }, []);

    useEffect(() => {
        if (!mounted || !interviewInfo || callStartedRef.current) return;
        callStartedRef.current = true;

        startCall();

        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Camera error:", error);
            }
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, [mounted, interviewInfo]);

    const startCall = () => {
        if (!vapiRef.current) return;
        
        let questionList = '';
        interviewInfo?.interviewData?.questionList?.forEach((item) => {
            questionList += item?.question + ", ";
        });

        const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: `Hi ${interviewInfo?.userName || 'there'}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition || 'this position'}?`,
            maxDurationSeconds: 1800,
            silenceTimeoutSeconds: 60,
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            voice: {
                provider: "11labs",
                voiceId: "21m00Tcm4TlvDq8ikWAM",
            },
            model: {
                provider: "openai",
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions and assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone.
Ask one question at a time and wait for the candidate's response before proceeding.
Questions: ${questionList}
If the candidate struggles, offer hints or rephrase.
Provide brief, encouraging feedback after each answer.
After 5-7 questions, summarize their performance and end on a positive note.
                        `.trim()
                    }
                ],
            }
        };

        const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
        if (assistantId) {
            vapiRef.current.start(assistantId);
        } else {
            vapiRef.current.start(assistantOptions);
        }
    };

    const stopInterview = () => {
        if (vapiRef.current) {
            vapiRef.current.stop();
        }
    };

    useEffect(() => {
        if (!mounted || !vapiRef.current) return;

        const handleMessage = (message) => {
            console.log('Message:', message);
            if (message?.conversation) {
                setConversation(JSON.stringify(message.conversation));
            }
        };

        const handleCallStart = () => {
            toast('Call Connected...');
        };

        const handleSpeechStart = () => setActiveUser(false);
        const handleSpeechEnd = () => setActiveUser(true);

        const handleCallEnd = () => {
            toast('Interview Ended');
            GenerateFeedback();
        };

        const handleError = (error) => {
            console.error("Vapi Error Details:", error);
            toast.error("Vapi Error: " + (error?.message || error?.error?.message || "Check Vapi key or Assistant configuration"));
        };

        vapiRef.current.on("message", handleMessage);
        vapiRef.current.on("call-start", handleCallStart);
        vapiRef.current.on("speech-start", handleSpeechStart);
        vapiRef.current.on("speech-end", handleSpeechEnd);
        vapiRef.current.on("call-end", handleCallEnd);
        vapiRef.current.on("error", handleError);

        return () => {
            if (vapiRef.current) {
                vapiRef.current.off("message", handleMessage);
                vapiRef.current.off('call-start', handleCallStart);
                vapiRef.current.off('speech-start', handleSpeechStart);
                vapiRef.current.off('speech-end', handleSpeechEnd);
                vapiRef.current.off('call-end', handleCallEnd);
                vapiRef.current.off('error', handleError);
            }
        };
    }, [mounted]);

    const GenerateFeedback = async () => {
        try {
            const result = await axios.post('/api/ai-feedback', {
                conversation: conversation
            });

            const content = result?.data?.content;
            if (!content) {
                toast.error("Failed to generate feedback properly.");
                return;
            }

            const cleanedContent = content.replace('```json', '').replace('```', '');
            const jsonMatch = cleanedContent.match(/{[\s\S]*}/);
            if (!jsonMatch) {
                toast.error("Failed to generate feedback properly.");
                return;
            }

            let parsedFeedback;
            try {
                parsedFeedback = JSON.parse(jsonMatch[0]);
            } catch (err) {
                parsedFeedback = new Function(`return (${jsonMatch[0]})`)();
            }

            const { data, error } = await supabase
                .from('interview-feedback')
                .insert([{
                    id: Date.now(),
                    userName: interviewInfo?.userName,
                    userEmail: interviewInfo?.userEmail,
                    interview_id: interview_id,
                    feedback: parsedFeedback,
                    recommended: false
                }]);

            router.replace(`/interview/${interview_id}/completed`);
        } catch (e) {
            console.error("GenerateFeedback error:", e);
            toast.error("Failed to generate feedback properly.");
        }
    };

    // Don't render until mounted to prevent SSR issues
    if (!mounted) {
        return (
            <div className='p-20 lg:px-48 xl:px-56'>
                <h2 className='font-bold text-xl'>Loading...</h2>
            </div>
        );
    }

    if (!interviewInfo) {
        return (
            <div className='p-20 lg:px-48 xl:px-56'>
                <h2 className='font-bold text-xl'>Interview Data Loading...</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
                    <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
                        <div className="h-[400px] bg-gray-200 rounded-lg"></div>
                    </div>
                    <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
                        <div className="h-[400px] bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='p-20 lg:px-48 xl:px-56'>
            <h2 className='font-bold text-xl flex justify-between'>
                AI Interview Session
                <span className='flex gap-2 items-center'>
                    <Timer />
                    00:00:00
                </span>
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
                {/* AI Recruiter */}
                <div className='bg-white h-[400px] rounded-lg border overflow-hidden relative'>
                    {!activeUser && (
                        <span className='absolute inset-0 opacity-75 animate-ping z-10'></span>
                    )}

                    <AvatarViewer
                        url=""
                        src="/ai_recruiter.png"
                        alt="AI Recruiter"
                        className="object-cover object-top rounded-lg"
                    />

                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded text-sm z-20">
                        AI Recruiter
                    </div>
                </div>

                {/* User Camera Feed */}
                <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center overflow-hidden'>
                    <div className='relative w-full h-full'>
                        {activeUser && (
                            <span className='absolute inset-0 rounded-full opacity-75 animate-ping'></span>
                        )}
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className='w-full h-full object-cover rounded-lg scale-x-[-1]'
                        />
                    </div>
                    <h2 className='text-center mt-2'>{interviewInfo?.userName}</h2>
                </div>
            </div>

            <div className='flex items-center gap-5 justify-center mt-7'>
                <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer' />
                <AlertConfirmation stopInterview={stopInterview}>
                    <Phone className='h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer' />
                </AlertConfirmation>
            </div>

            <h2 className='text-sm text-gray-400 text-center mt-5'>Interview in Progress...</h2>
        </div>
    );
}

export default StartInterview;