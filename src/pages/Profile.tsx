import React from 'react';

import { AuthContext } from '../context/AuthContext';

export const Profile: React.FC = () => {
  const { user, logout } = React.useContext(AuthContext);

  return user ? (
    <div className="flex flex-col px-4 -mx-2 md:px-12 md:flex-row md:space-y-0 space-y-4">
      <div className="w-full px-2 md:w-1/3 xl:w-2/5">
        <div className="w-full p-4 border rounded">
          <h2 className="mb-2 text-xl font-bold text-center md:text-4xl">
            {user.name}
          </h2>
          <p className="text-base font-medium text-center md:text-xl">
            Email:{' '}
            <span className="font-bold underline text-primary">
              {user.email}
            </span>
          </p>
        </div>
      </div>
      <div className="w-full max-h-full px-2 md:w-2/3 xl:w-3/5">
        <div className="w-full max-h-full p-4 border rounded space-y-4"></div>
      </div>
    </div>
  ) : null;
};
