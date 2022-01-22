import React from 'react';

import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { ROUTES } from '../routes';

import { PrivateNavbar } from './Layout/PrivateNavbar';

type PrivateRouteProps = {
  children: React.ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token, loading } = React.useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (token || loading) return;

    navigate(ROUTES.login);
  }, [token, loading, navigate]);

  return (
    <>
      <PrivateNavbar />
      <div className="pt-[81px]">{children}</div>
    </>
  );
};
