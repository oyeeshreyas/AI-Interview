"use client";
import React, { useContext, useEffect, useState } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { InterviewDataContext } from '@/context/InterviewDataContext'

const Interview = () => {
    const { interview_id } = useParams();
    const [interviewData, setInterviewData] = useState();
    const [userName, setUserName] = useState();
    const [loading, setLoading] = useState(false);
    const [useremail, setUserEmail] = useState();
    const { setInterviewInfo } = useContext(InterviewDataContext);
    const router = useRouter();

    useEffect(() => {
        interview_id && GetInterviewDetails();
    }, [interview_id]);

    const GetInterviewDetails = async () => {
        setLoading(true);
        try {
            let { data: interviews, error } = await supabase
                .from('interviews')
                .select("jobPosition,jobDescription,duration,type")
                .eq('interview_id', interview_id);
            
            if (!interviews || interviews.length === 0) {
                toast('Incorrect Interview Link');
                setLoading(false);
                return;
            }

            setInterviewData(interviews[0]);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            toast('Incorrect Interview Link');
        }
    };

    const onJoinInterview = async () => {
        setLoading(true);

        try {
            // 1. Request camera and mic
            if (navigator.mediaDevices?.getUserMedia) {
                try {
                    await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                } catch (camErr) {
                    console.warn("Camera/mic permission warning:", camErr);
                }
            }

            // 2. Request screen share if supported by browser
            if (navigator.mediaDevices?.getDisplayMedia) {
                try {
                    await navigator.mediaDevices.getDisplayMedia({ video: true });
                } catch (screenErr) {
                    console.warn("Screen share permission warning/canceled:", screenErr);
                }
            }

            // 3. Get interview data
            let { data: interviews, error } = await supabase
                .from('interviews')
                .select('*')
                .eq('interview_id', interview_id);

            if (error || !interviews || interviews.length === 0) {
                toast('Interview not found');
                setLoading(false);
                return;
            }

            // 4. Store interview info globally
            setInterviewInfo({
                userName: userName,
                userEmail: useremail,
                interviewData: interviews[0]
            });

            // 5. Navigate to interview start page
            router.push('/interview/' + interview_id + '/start');
        } catch (err) {
            console.error('Error joining interview:', err);
            toast.error('Failed to join interview.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='px-10 md:px-28 lg:px-48 xl:px-80 mt-7 '>
            <div className='flex flex-col items-center justify-center rounded-lg bg-white p-7 lg:px-33 xl:px-52 mb-20'>
                <h2 className='mt-3'>AI-Powered Interview Platform</h2>

                <h2 className='font-bold text-xl'>{interviewData?.jobPosition}</h2>
                <h2 className='flex gap-2 items-center text-gray-500 mt-3'><Clock className='h-4 w-4' /> {interviewData?.duration} </h2>

                <div className='w-full'>
                    <h2>Enter your full name</h2>
                    <Input placeholder='e.g. John Smith' onChange={(event) => setUserName(event.target.value)} />
                </div>
                <div className='w-full'>
                    <h2>Enter your Email</h2>
                    <Input placeholder='e.g. john@gmail.com' onChange={(event) => setUserEmail(event.target.value)} />
                </div>

                <div className='p-3 bg-white flex gap-4 rounded-lg border border-gray-200 mt-2'>
                    <Info className='text-primary mt-1' />
                    <div>
                        <h2 className='font-bold mb-2'>Before you begin</h2>
                        <ul className='list-disc ml-5'>
                            <li className='text-sm text-primary'>Test your camera and microphone</li>
                            <li className='text-sm text-primary'>Allow screen share access</li>
                            <li className='text-sm text-primary'>Ensure you have a stable internet connection</li>
                            <li className='text-sm text-primary'>Find a quiet place for the interview</li>
                        </ul>
                    </div>
                </div>

                <Button
                    className='mt-5 w-full font-bold'
                    disabled={loading || !userName || !useremail}
                    onClick={onJoinInterview}
                >
                    <Video className='mr-2' />
                    {loading ? <Loader2Icon className='animate-spin' /> : "Join Interview"}
                </Button>
            </div>
        </div>
    );
}

export default Interview;