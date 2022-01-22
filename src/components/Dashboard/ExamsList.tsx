import React from 'react';

import { Rating } from 'react-simple-star-rating';

import { Exam } from '../../models/types';
import { ExamDifficultyBadge } from '../ExamDifficultyBadge';

type ExamsListProps = {
  exams: Exam[];
};

export const ExamsList: React.FC<ExamsListProps> = ({ exams }) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full">
        <div className="w-5/12 text-sm font-bold text-gray-600 md:text-base">
          Name
        </div>
        <div className="w-2/12 text-sm font-bold text-center text-gray-600 md:text-base">
          Questions
        </div>
        <div className="w-2/12 text-sm font-bold text-center text-gray-600 md:text-base">
          Rating
        </div>
        <div className="w-3/12 text-sm font-bold text-right text-gray-600 md:text-base">
          Difficulty
        </div>
      </div>
      {exams.map((exam) => (
        <ExamComponent key={exam.id} exam={exam} />
      ))}
    </div>
  );
};

const ExamComponent: React.FC<{ exam: Exam }> = ({ exam }) => (
  <div className="flex items-center justify-between flex-grow pt-3 pb-2 border-b-2 cursor-pointer border-primary-5">
    <p className="w-5/12 m-0 text-sm font-bold md:text-base">{exam.title}</p>
    <div className="w-2/12 font-bold text-center">{exam.numOfQuestions}</div>
    <div className="w-2/12 font-bold text-center">
      <Rating
        ratingValue={exam.averageScore * 20}
        initialValue={exam.averageScore * 20}
        size={20}
        allowHalfIcon
        allowHover={false}
        readonly
      />
    </div>
    <div className="w-3/12 text-right">
      <ExamDifficultyBadge difficulty={exam.difficulty} />
    </div>
  </div>
);
