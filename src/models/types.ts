export type Category = {
  id: number;
  title: string;
  topicId: number;
  numOfQuestions: number;
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
  topicId: number;
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
