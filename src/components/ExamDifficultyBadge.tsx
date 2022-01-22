import React from 'react';

import { ExamDifficulty } from '../models/types';

type ExamDifficultyBadgeProps = {
  difficulty: ExamDifficulty;
};

const COLORS: Record<ExamDifficulty, string> = {
  [ExamDifficulty.high]: 'bg-red-700 text-white',
  [ExamDifficulty.intermediate]: 'bg-yellow-400 text-black',
  [ExamDifficulty.low]: 'bg-green-700 text-white',
};

const LABELS: Record<ExamDifficulty, string> = {
  [ExamDifficulty.high]: 'High',
  [ExamDifficulty.intermediate]: 'Intermediate',
  [ExamDifficulty.low]: 'Low',
};

export const ExamDifficultyBadge: React.FC<ExamDifficultyBadgeProps> = ({
  difficulty,
}) => (
  <div
    className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${COLORS[difficulty]}`}
  >
    {LABELS[difficulty]}
  </div>
);
