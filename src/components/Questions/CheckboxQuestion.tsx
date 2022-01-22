import React from 'react';

import { FormControlLabel, FormGroup, Checkbox } from '@material-ui/core';

export type CheckboxQuestionProps = {
  options: string[];
  answers: string[];
  onChange: (answer: string[]) => void;
};

export const CheckboxQuestion: React.FC<CheckboxQuestionProps> = ({
  answers,
  options,
  onChange,
}) => (
  <FormGroup>
    {options.map((value, index) => {
      const isChecked = answers.includes(value);

      return (
        <FormControlLabel
          key={value}
          control={
            <Checkbox
              color="primary"
              value={value}
              checked={isChecked}
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
