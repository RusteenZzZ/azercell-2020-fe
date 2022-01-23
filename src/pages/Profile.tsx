import React from 'react';

import { Link } from 'react-router-dom';

import { ExamDifficultyBadge } from '../components/ExamDifficultyBadge';
import { AuthContext } from '../context/AuthContext';
import { ExamDifficulty } from '../models/types';
import { ROUTES } from '../routes';
import { addAuthHeader, api } from '../utils/axios';

type ExamData = {
  id: number;
  createdAt: Date;
  title: string;
  score: number;
  difficulty: ExamDifficulty;
};

export const Profile: React.FC = () => {
  const { user, token, logout } = React.useContext(AuthContext);
  const [exams, setExams] = React.useState<ExamData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [fetched, setFetched] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (!token || loading || fetched) return;

    const fetchExams = async () => {
      setLoading(true);
      const response = await api.get('users-exams', {
        headers: { ...addAuthHeader(token) },
      });
      setFetched(true);

      if (!response.data.error) {
        setExams(response.data);
      }
      setLoading(false);
    };

    fetchExams();
  }, [token, loading, fetched]);

  return user ? (
    <div className="flex flex-col px-4 -mx-2 md:px-12 md:flex-row md:space-y-0 space-y-4">
      <div className="w-full px-2 md:w-1/3 xl:w-2/5">
        <div className="w-full p-4 border rounded">
          <h2 className="mb-2 text-xl font-bold text-center md:text-4xl">
            {user.name}
          </h2>
          <p className="text-base font-medium text-center md:text-xl">
            Email:{' '}
            <span className="font-bold underline text-primary">
              {user.email}
            </span>
          </p>
        </div>
      </div>
      <div className="w-full max-h-full px-2 md:w-2/3 xl:w-3/5">
        <div className="w-full max-h-full p-4 border rounded space-y-4">
          {exams.length > 0 ? (
            <div className="flex justify-between">
              <h4 className="text-xl font-bold">Passed exams</h4>
            </div>
          ) : (
            <div className="flex justify-center">
              <h4 className="text-xl font-bold">No passed exams</h4>
            </div>
          )}
          {exams.map((exam) => (
            <Link
              to={ROUTES.reviewExam.replace(':examId', exam.id.toString())}
              key={exam.id}
              className="flex items-center justify-between pt-3 pb-2 border-b border-primary-5"
            >
              <h5 className="text-lg font-medium">{exam.title}</h5>
              <div className="flex items-center space-x-4">
                <span className="font-medium">
                  {exam.score?.toFixed(2)}{' '}
                  <span className="text-lg text-primary">/</span> 100
                </span>
                <ExamDifficultyBadge difficulty={exam.difficulty} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};
