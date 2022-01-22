import React from 'react';

import { AuthContext } from '../context/AuthContext';

export const Profile: React.FC = () => {
  const { user, logout } = React.useContext(AuthContext);

  return null;
};
