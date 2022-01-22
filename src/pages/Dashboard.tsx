import React from 'react';

import { FilterExams } from '../components/Dashboard/FilterExams';
import { SearchBar } from '../components/SearchBar';
import { DataContext } from '../context/DataContext';
import { Topic } from '../models/types';

export const Dashboard: React.FC = () => {
  const { topics, exams } = React.useContext(DataContext);
  const [selectedTopics, setSelectedTopics] = React.useState<Topic[]>([]);
  const [query, setQuery] = React.useState<string>('');

  return (
    <div className="flex px-4 -mx-2 md:px-12">
      <div className="w-full px-2 md:w-1/3 xl:w-1/5">
        <div className="w-full p-4 border rounded">
          <div className="text-2xl font-bold">Filter exams</div>
          <FilterExams
            topics={topics}
            selectedTopics={selectedTopics}
            selectedCategories={[]}
            setSelectedTopics={setSelectedTopics}
            setSelectedCategories={() => null}
          />
        </div>
      </div>
      <div className="w-full px-2 md:w-2/3 xl:w-4/5">
        <div className="w-full p-4 border rounded">
          <SearchBar query={query} onChange={setQuery} />
        </div>
      </div>
    </div>
  );
};
