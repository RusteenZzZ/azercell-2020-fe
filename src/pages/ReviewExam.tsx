import React from 'react';

import { useNavigate, useParams } from 'react-router';

import { Progress } from '../components/Progress';
import { QuestionComponent } from '../components/Questions/Question';
import { AuthContext } from '../context/AuthContext';
import { QuestionType } from '../models/types';
import { ROUTES } from '../routes';
import { addAuthHeader, api } from '../utils/axios';
import { MarkdownPreview } from '../utils/markdown';

type QuestionReviewed = {
  givenAnswer: string;
  type: QuestionType;
  title: string;
  isCorrect: boolean;
  suggestion?: string;
  categoryId: number;
  categoryTitle: string;
  id: number;
  options?: string;
};

type ReviewDataType = {
  score: number;
  examTitle: string;
  questionReviews: QuestionReviewed[];
};

type ParamsType = {
  examId: string;
};

export const ReviewExam: React.FC = () => {
  const navigate = useNavigate();
  const { token } = React.useContext(AuthContext);
  const { examId } = useParams<ParamsType>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [fetched, setFetched] = React.useState<boolean>(false);
  const [review, setReview] = React.useState<ReviewDataType | null>(null);

  const categories = React.useMemo<Record<number, string>>(() => {
    if (!review) return {};

    return Object.fromEntries(
      review.questionReviews.map((questionReivew) => [
        questionReivew.categoryId,
        questionReivew.categoryTitle,
      ]),
    );
  }, [review]);

  const categoriesStats = React.useMemo(() => {
    if (!review || !categories) return {};
    const initialValue = Object.fromEntries(
      Object.keys(categories).map((c) => [c, { correct: 0, total: 0 }]),
    );
    return review.questionReviews.reduce(
      (acc, { isCorrect, categoryId }) => ({
        ...acc,
        [categoryId]: {
          correct: acc[categoryId].correct + (isCorrect ? 1 : 0),
          total: acc[categoryId].total + 1,
        },
      }),
      initialValue,
    );
  }, [categories, review]);

  console.log(categoriesStats);

  React.useEffect(() => {
    if (!token || !examId || loading || fetched) return;

    const fetchReview = async () => {
      setLoading(true);
      const response = await api.get(`/users-exams/${examId}/review`, {
        headers: { ...addAuthHeader(token) },
      });

      setLoading(false);
      setFetched(true);

      if (response.data.error) {
        navigate(ROUTES.dashboard);
      } else {
        setReview(response.data);
      }
    };
    fetchReview();
  }, [token, examId, loading, fetched, navigate]);

  return review ? (
    <div className="px-4 md:px-12">
      <h2 className="text-2xl text-center md:text-5xl">
        Review of exam <span className="font-bold text-primary">"</span>
        {review.examTitle}
        <span className="font-bold text-primary">"</span>
      </h2>
      <h3 className="text-xl font-medium text-center md:text-4xl">
        {review.score.toFixed(2)}{' '}
        <span className="text-2xl font-bold md:text-5xl text-primary">/</span>{' '}
        100
      </h3>

      <div className="space-y-2">
        {Object.entries(categoriesStats).map(([id, stat]) => {
          const progress = (stat.correct / stat.total) * 100;

          return (
            <div key={id}>
              <span className="mb-1 text-lg font-medium">
                {categories[+id]}:{' '}
                <span className="font-bold text-primary">
                  {progress.toFixed(2)}%
                </span>
                <Progress progress={progress} />
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col my-10 space-y-4">
        {review.questionReviews.map((questionReview, index) => {
          const isCheckbox = questionReview.type === QuestionType.checkbox;
          const isRadio = questionReview.type === QuestionType.radio;
          const answer = isCheckbox
            ? questionReview.givenAnswer.split(
                process.env.REACT_APP_DELIMITER ?? '',
              )
            : questionReview.givenAnswer;
          const options =
            (isCheckbox || isRadio) && questionReview.options
              ? questionReview.options.split(
                  process.env.REACT_APP_DELIMITER ?? '',
                )
              : undefined;

          return (
            <div key={questionReview.id}>
              <div
                className={`p-4 rounded-lg bg-opacity-40 ${
                  questionReview.isCorrect ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                <QuestionComponent
                  order={index + 1}
                  title={questionReview.title}
                  answer={answer}
                  type={questionReview.type}
                  id={questionReview.id}
                  coefficient={-1}
                  setAnswer={() => null}
                  options={options}
                  readonly
                />
              </div>
              {!questionReview.isCorrect && questionReview.suggestion && (
                <div className="mt-2">
                  <span className="font-bold text-primary">Suggestion:</span>{' '}
                  <MarkdownPreview mdContent={questionReview.suggestion} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};
