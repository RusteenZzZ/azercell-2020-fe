import React from 'react';

import { Navbar } from './Layout/Navbar';

type PublicRouteProps = {
  children: React.ReactNode;
};

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="pt-[81px]">{children}</div>
    </>
  );
};
