import React from 'react';

import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';

import { Category, Topic } from '../../models/types';

type FilterExamsProps = {
  topics: Topic[];
  selectedTopics: Topic[];
  selectedCategories: Category[];
  showCategories?: boolean;
  setSelectedTopics: (topics: Topic[]) => void;
  setSelectedCategories: (categories: Category[]) => void;
};

export const FilterExams: React.FC<FilterExamsProps> = ({
  topics,
  selectedTopics,
  selectedCategories,
  showCategories,
  setSelectedCategories,
  setSelectedTopics,
}) => {
  return (
    <div className="flex flex-col pl-4">
      {topics.map((topic) => (
        <div key={topic.id}></div>
      ))}
      <FormGroup>
        {topics.map((topic) => {
          const isChecked = selectedTopics.includes(topic);

          const handleTopicClick = () => {
            if (isChecked) {
              setSelectedTopics(
                selectedTopics.filter(
                  (selectedTopic) => selectedTopic !== topic,
                ),
              );
              setSelectedCategories(
                selectedCategories.filter(
                  (category) => !topic.categories.includes(category),
                ),
              );
            } else {
              setSelectedTopics([...selectedTopics, topic]);
              setSelectedCategories([
                ...new Set([...selectedCategories, ...topic.categories]),
              ]);
            }
          };

          return (
            <div key={topic.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    value={topic.id}
                    checked={isChecked}
                    onChange={handleTopicClick}
                    size="small"
                  />
                }
                label={topic.title}
              />
              {isChecked && showCategories && (
                <div className="pl-4">
                  {topic.categories.map((category) => {
                    const isCategoryChecked =
                      selectedCategories.includes(category);

                    const handleCategoryClick = () => {
                      if (isCategoryChecked) {
                        if (
                          !selectedCategories.some(
                            (selectedCategory) =>
                              selectedCategory !== category &&
                              topic.categories.includes(selectedCategory),
                          )
                        ) {
                          setSelectedTopics(
                            selectedTopics.filter(
                              (selectedTopic) => selectedTopic !== topic,
                            ),
                          );
                        }
                        setSelectedCategories(
                          selectedCategories.filter(
                            (selectedCategory) => selectedCategory !== category,
                          ),
                        );
                      } else if (!isChecked) {
                        setSelectedTopics([...selectedTopics, topic]);
                        setSelectedCategories([
                          ...selectedCategories,
                          category,
                        ]);
                      }
                    };

                    return (
                      <div key={category.id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              value={category.id}
                              checked={isCategoryChecked}
                              onChange={handleCategoryClick}
                              size="small"
                            />
                          }
                          label={category.title}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </FormGroup>
    </div>
  );
};
