import React from 'react';

type QuestionTitleProps = {
  order: number;
  title: string;
};

export const QuestionTitle: React.FC<QuestionTitleProps> = ({
  order,
  title,
}) => {
  return (
    <h5 className="text-lg font-bold md:text-2xl">
      <span className="text-primary">{order}.</span> {title}
    </h5>
  );
};
