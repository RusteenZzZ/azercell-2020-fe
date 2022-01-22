import React from 'react';

import { ExamsList } from '../components/Dashboard/ExamsList';
import { FilterExams } from '../components/Dashboard/FilterExams';
import { SearchBar } from '../components/SearchBar';
import { DataContext } from '../context/DataContext';
import { Exam, Topic } from '../models/types';

export const Dashboard: React.FC = () => {
  const { topics, exams } = React.useContext(DataContext);
  const [selectedTopics, setSelectedTopics] = React.useState<Topic[]>([]);
  const [query, setQuery] = React.useState<string>('');

  const filteredExams = React.useMemo<Exam[]>(() => {
    return exams.filter((exam) =>
      exam.title.toLowerCase().includes(query.toLowerCase()),
    );
    // const filteredByTopics = exams.filter(exam => exam.)
  }, [exams, query]);

  return (
    <div className="flex flex-col px-4 -mx-2 md:px-12 md:flex-row md:space-y-0 space-y-4">
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
        <div className="w-full p-4 border rounded space-y-4">
          <SearchBar query={query} onChange={setQuery} />
          <ExamsList exams={filteredExams} />
        </div>
      </div>
    </div>
  );
};
