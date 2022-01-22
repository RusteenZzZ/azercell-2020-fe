import React from 'react';

import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';

import { Topic } from '../../models/types';

type FilterExamsProps = {
  topics: Topic[];
  selectedTopics: Topic[];
  setSelectedTopics: (topics: Topic[]) => void;
};

export const FilterExams: React.FC<FilterExamsProps> = ({
  topics,
  selectedTopics,
  setSelectedTopics,
}) => {
  return (
    <div className="flex flex-col p-4">
      {topics.map((topic) => (
        <div key={topic.id}></div>
      ))}
      <FormGroup>
        {topics.map((topic) => {
          const isChecked = selectedTopics.includes(topic);

          return (
            <FormControlLabel
              key={topic.id}
              control={
                <Checkbox
                  color="primary"
                  value={topic.id}
                  checked={isChecked}
                  onChange={() =>
                    setSelectedTopics(
                      isChecked
                        ? selectedTopics.filter(
                            (selectedTopic) => selectedTopic !== topic,
                          )
                        : [...selectedTopics, topic],
                    )
                  }
                  size="small"
                />
              }
              label={topic.title}
            />
          );
        })}
      </FormGroup>
    </div>
  );
};
