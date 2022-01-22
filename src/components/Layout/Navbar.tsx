import React from 'react';

import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <div className="fixed top-0 w-full px-4 py-4 bg-white md:px-12">
      <div className="flex items-center justify-between">
        <div className="flex">
          <h1 className="text-3xl font-bold">Examut</h1>
          <span className="text-7xl text-primary leading-[5px]">.</span>
        </div>
        <div className="flex text-lg font-bold space-x-4">
          <Link to="">Dashboard</Link>
          <Link to="">Pricing</Link>
          <Link to="">About us</Link>
        </div>
      </div>
    </div>
  );
};
