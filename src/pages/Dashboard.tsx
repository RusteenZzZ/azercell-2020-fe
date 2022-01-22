import React from 'react';

import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

import { ExamsList } from '../components/Dashboard/ExamsList';
import { FilterExams } from '../components/Dashboard/FilterExams';
import { SearchBar } from '../components/SearchBar';
import { DataContext } from '../context/DataContext';
import { Exam, Topic } from '../models/types';
import { ROUTES } from '../routes';

export const Dashboard: React.FC = () => {
  const { topics, exams } = React.useContext(DataContext);
  const [selectedTopics, setSelectedTopics] = React.useState<Topic[]>([]);
  const [query, setQuery] = React.useState<string>('');

  const filteredExams = React.useMemo<Exam[]>(() => {
    // const filteredByTopics = exams.filter(exam => selectedTopics.includes(exam.))
    return exams.filter((exam) =>
      exam.title.toLowerCase().includes(query.toLowerCase()),
    );
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
      <div className="w-full max-h-full px-2 md:w-2/3 xl:w-4/5">
        <div className="w-full max-h-full p-4 border rounded space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-grow">
              <SearchBar query={query} onChange={setQuery} />
            </div>
            <Link
              to={ROUTES.newExam}
              className="border rounded-full cursor-pointer border-primary transition-colors duration-200 hover:bg-primary hover:text-white text-primary"
            >
              <AddIcon color="inherit" fontSize="large" />
            </Link>
          </div>
          <ExamsList exams={filteredExams} />
        </div>
      </div>
    </div>
  );
};
