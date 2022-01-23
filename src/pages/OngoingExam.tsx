/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Button } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router';
import { Rating } from 'react-simple-star-rating';

import { QuestionComponent } from '../components/Questions/Question';
import { AuthContext } from '../context/AuthContext';
import { Question, QuestionType } from '../models/types';
import { ROUTES } from '../routes';
import { addAuthHeader, api } from '../utils/axios';

type ParamsType = {
  examId: string;
};

type InProgressAnswer = string | string[];

export const OngoingExam: React.FC = () => {
  const { examId } = useParams<ParamsType>();
  const { token } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [fetched, setFetched] = React.useState<boolean>(false);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [answers, setAnswers] = React.useState<
    Record<number, InProgressAnswer>
  >([]);
  const [rating, setRating] = React.useState<number | null>(null);

  const currentQuestion = React.useMemo<Question | null>(
    () => questions[currentPage],
    [currentPage, questions],
  );

  const currentAnswer = React.useMemo<InProgressAnswer | null>(
    () => (currentQuestion ? answers[currentQuestion.id] : null),
    [answers, currentQuestion],
  );

  const showRating = React.useMemo<boolean>(
    () => currentPage === questions.length,
    [currentPage, questions.length],
  );

  const handleSetAnswer = React.useCallback(
    (value: string | string[]) => {
      if (!currentQuestion) return;
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestion.id]: value,
      }));
    },
    [currentQuestion],
  );

  const handlePrevClick = React.useCallback(() => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
  }, []);

  const handleNextClick = React.useCallback(async () => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  }, []);

  const handleSubmit = React.useCallback(async () => {
    if (!token || !rating || !examId) return;

    const mappedAnswers = Object.entries(answers).map(
      ([questionId, answer]) => ({
        questionId,
        answer: Array.isArray(answer)
          ? answer.join(process.env.REACT_APP_DELIMITER)
          : answer,
      }),
    );

    await api.patch(
      `/exams/${examId}`,
      {
        rating: rating / 20, // Convert from 100 to 5
        questionSubmissions: mappedAnswers,
      },
      {
        headers: { ...addAuthHeader(token) },
      },
    );

    navigate(ROUTES.reviewExam.replace(':examId', examId));
  }, [answers, rating, token, examId, navigate]);

  React.useEffect(() => {
    if (!token || fetched) return;

    const fetchQuestions = async () => {
      setLoading(true);
      const response = await api.get(`/users-exams/${examId}`, {
        headers: { ...addAuthHeader(token) },
      });

      setFetched(true);

      if (response.data.error) {
        navigate(ROUTES.dashboard);
      } else {
        setQuestions(
          response.data.map((question: any) => ({
            ...question,
            options: question.options?.split(process.env.REACT_APP_DELIMITER),
          })),
        );

        setAnswers(
          Object.fromEntries(
            response.data.map((question: any) => [
              question.id,
              question.type === QuestionType.checkbox ? [] : '',
            ]),
          ),
        );
      }
      setLoading(false);
    };
    fetchQuestions();
  }, [token, fetched, examId, navigate]);

  return (
    <div className="flex flex-col px-4 -mx-2 md:px-12 md:flex-row md:space-y-0 space-y-4">
      <div className="w-full px-2 md:w-1/3 xl:w-1/5">
        <div className="w-full p-4 border rounded"></div>
      </div>
      <div className="w-full px-2 md:w-2/3 xl:w-4/5">
        <div className="w-full p-4 border rounded">
          {currentQuestion && currentAnswer !== null && (
            <QuestionComponent
              {...currentQuestion}
              order={currentPage + 1}
              answer={currentAnswer}
              setAnswer={handleSetAnswer}
            />
          )}
          {!showRating ? (
            <div className="flex justify-between mt-4">
              <Button
                color="primary"
                variant="contained"
                className="font-bold"
                onClick={handlePrevClick}
                disabled={currentPage === 0}
                disableElevation
              >
                Previous
              </Button>
              <Button
                color="primary"
                variant="contained"
                className="font-bold"
                onClick={handleNextClick}
                disableElevation
              >
                {currentPage === questions.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <h5 className="text-2xl font-bold text-center">
                Please, rate the exam to submit
              </h5>
              <Rating
                ratingValue={rating ?? 0}
                initialValue={0}
                size={40}
                fillColor="#ff7900"
                onClick={setRating}
                allowHalfIcon
              />

              <Button
                variant="contained"
                color="primary"
                className="font-bold"
                disabled={rating === null}
                onClick={handleSubmit}
                disableElevation
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
