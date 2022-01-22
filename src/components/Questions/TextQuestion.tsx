import React from 'react';

import { TextField } from '@material-ui/core';

type TextQuestionProps = {
  value: string;
  onChange: (value: string) => void;
};

export const TextQuestion: React.FC<TextQuestionProps> = ({
  value,
  onChange,
}) => {
  return (
    <TextField
      variant="standard"
      color="primary"
      value={value}
      onChange={(e) => onChange(e.target.value.trimStart())}
    />
  );
};
