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
    <h5 className="font-bold">
      <span className="text-primary">{order}.</span> {title}
    </h5>
  );
};
