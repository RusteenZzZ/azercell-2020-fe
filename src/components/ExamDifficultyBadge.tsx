import React from 'react';

import { ExamDifficulty } from '../models/types';

type ExamDifficultyBadgeProps = {
  difficulty: ExamDifficulty;
  size?: 'small' | 'medium';
};

const COLORS: Record<ExamDifficulty, string> = {
  [ExamDifficulty.high]: 'bg-red-700 text-white',
  [ExamDifficulty.intermediate]: 'bg-yellow-400 text-black',
  [ExamDifficulty.low]: 'bg-green-700 text-white',
};

const LABELS: Record<ExamDifficulty, string> = {
  [ExamDifficulty.high]: 'High',
  [ExamDifficulty.intermediate]: 'Medium',
  [ExamDifficulty.low]: 'Low',
};

export const ExamDifficultyBadge: React.FC<ExamDifficultyBadgeProps> = ({
  difficulty,
  size = 'small',
}) => (
  <div
    className={`inline-block rounded-full ${
      size === 'small' ? 'text-xs px-2 py-1' : 'text-base px-4 py-2'
    } font-bold ${COLORS[difficulty]}`}
  >
    {LABELS[difficulty]}
  </div>
);
