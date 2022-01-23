import React from 'react';

import { Link } from 'react-router-dom';

import { ROUTES } from '../../routes';

export const Navbar: React.FC = () => {
  return (
    <div className="fixed top-0 z-50 w-full px-4 py-4 bg-white md:px-12">
      <div className="flex items-center justify-between">
        <Link to={ROUTES.home} className="flex">
          <h1 className="text-3xl font-bold">Examut</h1>
          <span className="text-7xl text-primary leading-[5px]">.</span>
        </Link>
        <div className="flex text-lg font-bold space-x-4">
          <Link to={ROUTES.dashboard}>Dashboard</Link>
        </div>
      </div>
    </div>
  );
};
