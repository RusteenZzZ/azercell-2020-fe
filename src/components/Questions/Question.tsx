import React from 'react';

import { Question, QuestionType } from '../../models/types';

import { CheckboxQuestion } from './CheckboxQuestion';
import { QuestionTitle } from './QuestionTItle';
import { RadioQuestion } from './RadioQuestion';
import { TextQuestion } from './TextQuestion';

type QuestionProps = Question & {
  order: number;
  answer: string | string[];
  setAnswer: (answer: string | string[]) => void;
};

export const QuestionComponent: React.FC<QuestionProps> = ({
  title,
  order,
  penalty,
  coefficient,
  options,
  type,
  answer,
  setAnswer,
}) => {
  return (
    <div className="space-y-2">
      <QuestionTitle title={title} order={order} />
      <div>
        <div className="flex mb-4 space-x-4">
          <span className="font-medium">
            Coefficient:{' '}
            <span className="font-bold text-primary">{coefficient}</span>
          </span>
          {!!penalty && penalty > 0 && (
            <span className="font-medium">
              Penalty: <span className="font-bold text-primary">{penalty}</span>
            </span>
          )}
        </div>
        {type === QuestionType.text && (
          <TextQuestion value={answer as string} onChange={setAnswer} />
        )}
        {type === QuestionType.checkbox && options && (
          <CheckboxQuestion
            options={options}
            answers={answer as string[]}
            onChange={setAnswer}
          />
        )}
        {type === QuestionType.radio && options && (
          <RadioQuestion
            options={options}
            answer={answer as string}
            onChange={setAnswer}
          />
        )}
      </div>
    </div>
  );
};
