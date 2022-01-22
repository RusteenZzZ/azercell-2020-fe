export type Topic = {
  id: number;
  title: string;
};

export type Category = {
  id: number;
  title: string;
  topicId: number;
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
