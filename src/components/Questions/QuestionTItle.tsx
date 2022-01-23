import React from 'react';

type QuestionTitleProps = {
  order: number;
  title: string;
  readonly?: boolean;
};

export const QuestionTitle: React.FC<QuestionTitleProps> = ({
  order,
  title,
  readonly,
}) => {
  return (
    <h5
      className={`text-lg font-bold ${readonly ? 'md:text-lg' : 'md:text-2xl'}`}
    >
      <span className="text-primary">{order}.</span> {title}
    </h5>
  );
};
