import React from 'react';

import { FormControlLabel, FormGroup, Checkbox } from '@material-ui/core';

export type CheckboxQuestionProps = {
  options: string[];
  answers: string[];
  disabled?: boolean;
  onChange: (answer: string[]) => void;
};

export const CheckboxQuestion: React.FC<CheckboxQuestionProps> = ({
  answers,
  options,
  disabled,
  onChange,
}) => (
  <FormGroup>
    {options.map((value) => {
      const isChecked = answers.includes(value);

      return (
        <FormControlLabel
          key={value}
          control={
            <Checkbox
              color="primary"
              value={value}
              checked={isChecked}
              disabled={disabled}
              onChange={() =>
                onChange(
                  isChecked
                    ? answers.filter((answer) => answer !== value)
                    : [...answers, value],
                )
              }
              size="small"
            />
          }
          label={value}
        />
      );
    })}
  </FormGroup>
);
