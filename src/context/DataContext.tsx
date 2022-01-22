import React from 'react';

import { Category, Exam, Topic } from '../models/types';
import { addAuthHeader, api } from '../utils/axios';

import { AuthContext } from './AuthContext';

export type DataContextProps = {
  topics: Topic[];
  exams: Exam[];
};

type DataContextProviderProps = {
  children: React.ReactNode;
};

const initialValues: DataContextProps = {
  topics: [],
  exams: [],
};

export const DataContext = React.createContext<DataContextProps>(initialValues);

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
}) => {
  const { token } = React.useContext(AuthContext);
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [exams, setExams] = React.useState<Exam[]>([]);
  const [requested, setRequested] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (requested || !token) return;
    setRequested(true);

    const fetchData = async () => {
      let response = await api.get('/topics', {
        headers: { ...addAuthHeader(token) },
      });

      setTopics(response.data);

      response = await api.get('/exams', {
        headers: { ...addAuthHeader(token) },
      });

      setExams(response.data);
    };

    fetchData();
  }, [requested, token]);

  const value = React.useMemo(() => ({ topics, exams }), [topics, exams]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
