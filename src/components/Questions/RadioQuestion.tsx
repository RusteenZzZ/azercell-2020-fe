import React from 'react';

import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

export type RadioQuestionProps = {
  answer: string | null;
  options: string[];
  disabled?: boolean;
  onChange: (answer: string) => void;
};

export const RadioQuestion: React.FC<RadioQuestionProps> = ({
  answer,
  options,
  disabled,
  onChange,
}) => (
  <RadioGroup>
    {options.map((option) => {
      const isChecked = option === answer;

      return (
        <FormControlLabel
          key={option}
          control={
            <Radio
              color="primary"
              value={option}
              disabled={disabled}
              onChange={() => onChange(option)}
              size="small"
            />
          }
          label={option}
          checked={isChecked}
        />
      );
    })}
  </RadioGroup>
);
