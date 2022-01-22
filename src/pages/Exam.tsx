import React from 'react';

import { Button, Divider } from '@material-ui/core';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import { ExamDifficultyBadge } from '../components/ExamDifficultyBadge';
import { AuthContext } from '../context/AuthContext';
import { Exam } from '../models/types';
import { ROUTES } from '../routes';
import { addAuthHeader, api } from '../utils/axios';
import { MarkdownPreview } from '../utils/markdown';

type ParamsType = {
  examId: string;
};

export const ExamPage: React.FC = () => {
  const navigate = useNavigate();
  const { token } = React.useContext(AuthContext);
  const { examId } = useParams<ParamsType>();

  const [exam, setExam] = React.useState<Exam | null>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleStart = React.useCallback(async () => {
    if (!token) return;
    api.post(`/exams/${examId}`, {}, { headers: {} });
  }, [token, examId]);

  React.useEffect(() => {
    if (exam || loading || !token) return;

    const fetchExam = async () => {
      setLoading(true);
      const response = await api.get(`/exams/${examId}`, {
        headers: { ...addAuthHeader(token) },
      });

      if (!response.data) navigate(ROUTES.dashboard);
      else setExam(response.data);

      setLoading(false);
    };

    fetchExam();
  }, [exam, loading, token, examId, navigate]);

  return exam ? (
    <div className="px-4 md:px-12">
      <div className="p-4 border rounded">
        <div className="flex items-center justify-between">
          <h4 className="text-2xl font-bold">{exam.title}</h4>

          <div className="flex items-center space-x-6">
            <Rating
              ratingValue={exam.averageScore * 20}
              initialValue={exam.averageScore * 20}
              size={25}
              allowHalfIcon
              allowHover={false}
              fillColor="#ff7900"
              readonly
            />
            <ExamDifficultyBadge size="medium" difficulty={exam.difficulty} />
          </div>
        </div>

        <Divider className="my-4" variant="middle" />

        <div className="flex items-center justify-center space-x-10">
          <div className="flex items-center justify-between space-x-4">
            <p className="mb-0 text-lg font-medium">Number of questions:</p>{' '}
            <span className="font-bold text-primary">
              {exam.numOfQuestions}
            </span>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <p className="mb-0 text-lg font-medium">Number of submissions:</p>{' '}
            <span className="font-bold text-primary">
              {exam.numOfParticipated}
            </span>
          </div>
        </div>

        <Divider className="my-4" variant="middle" />
        {exam.description && (
          <div>
            <p className="mb-2 text-xl font-medium">Description</p>
            <MarkdownPreview mdContent={exam.description} />
          </div>
        )}
        <div className="flex justify-end mt-4">
          <Button
            variant="contained"
            color="primary"
            className="font-bold text-white"
            disableElevation
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};
