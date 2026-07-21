import { Button } from '@/components/ui/button';
import moment from 'moment';
import React from 'react';
import CandidateFeedbackDialog from './CandidateFeedbackDialog';

function CandidateList({ candidateList = [] }) {
  return (
    <div>
      <h2 className='font-bold my-5 text-2xl'>
        Candidates ({candidateList.length})
      </h2>

      {candidateList.map((candidate, index) => {
        const ratings = candidate?.feedback?.feedback?.rating || {};
        const totalScore =
          (ratings.technicalSkills || 0) +
          (ratings.communication || 0) +
          (ratings.problemSolving || 0) +
          (ratings.experience || 0);
        const numberOfSkills = 4;
        const overallRating = (totalScore / numberOfSkills).toFixed(1);

        return (
          <div key={index} className='p-5 flex gap-3 items-center border rounded-lg justify-between'>
            <div className='flex items-center gap-5'>
              <h2 className='bg-primary font-bold text-white p-3 px-4.5 rounded-full'>
                {candidate?.userName?.[0]}
              </h2>
              <div>
                <h2 className='font-bold'>{candidate?.userName}</h2>
                <h2 className='text-sm text-gray-500'>
                  Completed On: {moment(candidate?.created_at).format('MMM DD, yyyy')}
                </h2>
              </div>
            </div>
            <div className='flex gap-3 items-center'>
              <h2 className='text-green-600 font-bold'>{overallRating}/10</h2>
              <CandidateFeedbackDialog candidate={candidate} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CandidateList;