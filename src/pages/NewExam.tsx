import React from 'react';

import { Button, TextField } from '@material-ui/core';

import { FilterExams } from '../components/Dashboard/FilterExams';
import { DataContext } from '../context/DataContext';
import { Category, Topic } from '../models/types';

export const NewExam: React.FC = () => {
  const { topics } = React.useContext(DataContext);
  const [selectedTopics, setSelectedTopics] = React.useState<Topic[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<
    Category[]
  >([]);
  const [title, setTitle] = React.useState<string>('');

  const canCreate = React.useMemo<boolean>(() => {
    return selectedCategories.length > 0 && title.length > 0;
  }, [selectedCategories, title]);

  return (
    <div className="flex flex-col px-4 -mx-2 md:px-12 md:flex-row md:space-y-0 space-y-4">
      <div className="w-full px-2 md:w-1/3 xl:w-1/5">
        <div className="w-full p-4 border rounded">
          <p className="mb-2 text-xl font-bold">Choose topics</p>
          <FilterExams
            topics={topics}
            selectedTopics={selectedTopics}
            selectedCategories={selectedCategories}
            setSelectedTopics={setSelectedTopics}
            setSelectedCategories={setSelectedCategories}
            showCategories
          />
        </div>
      </div>
      <div className="w-full max-h-full px-2 md:w-2/3 xl:w-4/5">
        <div className="w-full max-h-full p-4 border rounded space-y-4">
          <p className="text-xl font-medium">
            <span className="font-bold text-primary">Info:</span> Your personal
            exam will be only visible for you. In order to publish your exams
            with <span className="font-bold text-primary">your own</span>{' '}
            questions to <span className="font-bold text-primary">test</span>{' '}
            other users, contact us for becoming our{' '}
            <span className="font-bold text-primary">corporate customer.</span>
          </p>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Enter exam title"
            value={title}
            onChange={(e) => setTitle(e.target.value.trimStart())}
            fullWidth
          />

          <div className="flex justify-end">
            <Button
              color="primary"
              variant="contained"
              className="font-bold text-white"
              disabled={!canCreate}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
