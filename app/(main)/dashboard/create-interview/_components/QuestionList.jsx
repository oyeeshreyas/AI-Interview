"use client";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';

function QuestionList({ formData, onCreateLink }) {

    const [loading, setLoading] = useState(true);
    const [questionList, setQuestionList] = useState();
    const {user}=useUser();
    const [saveLoading,setSaveLoading]=useState(false);
    useEffect(() => {
        if (formData) {
            GenerateQuestionList();
        }
    }, [formData])
    const GenerateQuestionList = async () => {
        setLoading(true);
        try {
            const result = await axios.post('/api/ai-model', {
                ...formData
            });
            console.log(result?.data?.content);

            let content = result?.data?.content;
            if (!content) {
                throw new Error("No response content returned from AI model");
            }
            content = content.replace('```json', '').replace('```', '').trim();

            const arrayStart = content.indexOf('[');
            const arrayEnd = content.lastIndexOf(']');
            if (arrayStart === -1 || arrayEnd === -1) {
                throw new Error("Invalid response format received from AI model");
            }
            const arrayString = content.substring(arrayStart, arrayEnd + 1);

            let questions;
            try {
                questions = JSON.parse(arrayString);
            } catch (jsonErr) {
                // Fallback for relaxed LLM JSON/JS object syntax (e.g. single quotes, unquoted keys, trailing commas)
                questions = new Function(`return (${arrayString})`)();
            }

            setQuestionList(questions);
            setLoading(false);
        } catch (e) {
            console.error(e);
            toast('Server Error, Try Again!');
            setLoading(false);
        }
    };

    const onFinish = async () => {
        setSaveLoading(true);
        const interview_id = uuidv4();

        const formattedType = Array.isArray(formData?.type)
            ? JSON.stringify(formData.type)
            : formData?.type;

        const { data, error } = await supabase
            .from('interviews')
            .insert([
                {
                    id: Date.now(),
                    ...formData,
                    type: formattedType,
                    questionList: questionList,
                    userEmail: user?.email,
                    interview_id: interview_id,
                },
            ])
            .select();

        if (error) {
            console.error("Supabase insert error:", error);
            toast.error("Failed to save interview: " + (error.message || "Database error"));
            setSaveLoading(false);
            return;
        }

        // Update User Credit
        if (user?.email) {
            const currentCredits = user?.credits !== undefined && user?.credits !== null ? Number(user.credits) : 10;
            const newCredits = Math.max(0, currentCredits - 1);

            const userUpdate = await supabase
                .from('Users')
                .update({ credits: newCredits })
                .eq('email', user?.email)
                .select();
            console.log("User credits updated:", userUpdate);
        }

        setSaveLoading(false);
        onCreateLink(interview_id);
    };

    return (
        <div>
            {loading &&
                <div className='p-5 bg-white rounded-xl border border-primary flex gap-5 items-center'>
                    <Loader2Icon className='animate-spin' />
                    <div>
                        <h2 className='font-medium'>Generating Interview Questions</h2>
                        <p className='text-primary'>Our AI is crafting personalized questions bases on your job position</p>
                    </div>


                </div>}
            {questionList?.length > 0 &&
            <div>
                <QuestionListContainer questionList={questionList}/>
                </div>

            }
            <div className='flex justify-end mt-10'>
            <Button onClick={()=>onFinish()} disabled={saveLoading}>
                {saveLoading&&<Loader2 className='animate-spin'/>}
                Create Interview Link & Finish</Button>
            </div>
            
        </div>
    )
}

export default QuestionList
