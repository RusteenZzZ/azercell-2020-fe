import React from 'react';

import { LinearProgress } from '@material-ui/core';

export const Progress: React.FC<{ progress: number }> = ({ progress }) => (
  <LinearProgress
    color="primary"
    value={progress}
    variant="determinate"
    className="h-6 rounded"
  />
);
