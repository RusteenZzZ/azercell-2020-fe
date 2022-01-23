import React from 'react';

import { TextField } from '@material-ui/core';

type TextQuestionProps = {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export const TextQuestion: React.FC<TextQuestionProps> = ({
  value,
  disabled,
  onChange,
}) => {
  return (
    <TextField
      variant="outlined"
      color="primary"
      placeholder="Answer"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value.trimStart())}
      size="small"
      fullWidth
    />
  );
};
