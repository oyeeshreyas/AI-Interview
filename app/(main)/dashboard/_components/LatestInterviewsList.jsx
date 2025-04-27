"use client"
import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { Camera, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'

function LatestInterviewsList() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  // useEffect = (() => {
  //   user && GetInterviewList();
  // }, [user])

  const GetInterviewList = async () => {
    let { data: interviews, error } = await supabase
      .from('interviews')
      .select('*')
      .eq('userEmail', user?.email)

    console.log(interviews)
  }
  return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl'>Previously Created Interviews</h2>

      {interviewList?.length == 0 &&
        <div className='p-5 flex flex-col gap-3 items-center mt-5 border border-gray-200 rounded-2xl'>
          <Video className='h-10 w-10 text-primary' />
          <h2>You dont't have any interview created!</h2>
          <Button>+ Create New Interview</Button>
        </div>}
    </div>
  )
}

export default LatestInterviewsList
