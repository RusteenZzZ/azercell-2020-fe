import React from 'react';

import { FilterExams } from '../components/Dashboard/FilterExams';
import { DataContext } from '../context/DataContext';
import { Category, Topic } from '../models/types';

export const Dashboard: React.FC = () => {
  const { topics } = React.useContext(DataContext);
  const [selectedTopics, setSelectedTopics] = React.useState<Topic[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<
    Category[]
  >([]);

  return (
    <div>
      <FilterExams
        topics={topics}
        selectedTopics={selectedTopics}
        selectedCategories={selectedCategories}
        showCategories
        setSelectedTopics={setSelectedTopics}
        setSelectedCategories={setSelectedCategories}
      />
    </div>
  );
};
