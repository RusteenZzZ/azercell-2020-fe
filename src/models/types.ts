export type Category = {
  id: number;
  title: string;
  topicId: number;
};

export type Topic = {
  id: number;
  title: string;
  categories: Category[];
};

export enum ExamDifficulty {
  low = 'LOW',
  intermediate = 'INTERMEDIATE',
  high = 'HIGH',
}

export enum ExamStatus {
  notStarted = 'NOT_STARTED',
  onGoing = 'ONGOING',
  finished = 'FINISHED',
}

export type Exam = {
  id: number;
  title: string;
  status: ExamStatus;
  difficulty: ExamDifficulty;
  numOfQuestions: number;
  numOfParticipated: number;
  description: string;
  rate: number;
  averageScore: number;
};

export enum QuestionType {
  checkbox = 'CHECKBOX',
  radio = 'RADIO',
  text = 'TEXT',
}

export type Question = {
  id: number;
  title: string;
  type: QuestionType;
  options?: string[];
  coefficient: number;
  penalty?: number;
};
