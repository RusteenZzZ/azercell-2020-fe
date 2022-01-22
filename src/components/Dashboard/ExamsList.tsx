import React from 'react';

import CloudOff from '@material-ui/icons/CloudOff';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import { Exam } from '../../models/types';
import { ROUTES } from '../../routes';
import { ExamDifficultyBadge } from '../ExamDifficultyBadge';

type ExamsListProps = {
  exams: Exam[];
};

export const ExamsList: React.FC<ExamsListProps> = ({ exams }) => {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex w-full max-h-full pr-4">
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

      {exams.length === 0 ? (
        <div>
          <div className="text-center text-primary-5 text-[200px]">
            <CloudOff fontSize="inherit" color="inherit" />
          </div>

          <div className="flex items-start justify-center space-x-2">
            <p className="mb-0 text-3xl font-bold">No results.</p>
            <Link
              to={ROUTES.newExam}
              className="pb-2 text-3xl font-bold underline underline-offset-4 text-primary"
            >
              Create new
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex-grow pr-4 overflow-y-auto max-h-[calc(100vh-240px)]">
          {exams.map((exam) => (
            <ExamComponent key={exam.id} exam={exam} />
          ))}
        </div>
      )}
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
        fillColor="#ff7900"
        readonly
      />
    </div>
    <div className="w-3/12 text-right">
      <ExamDifficultyBadge difficulty={exam.difficulty} />
    </div>
  </div>
);
