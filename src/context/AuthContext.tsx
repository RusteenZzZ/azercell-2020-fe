import React from 'react';

import { useNavigate } from 'react-router-dom';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type AuthContextProps = {
  user: User | null;
  token: string | null;
  error: string | null;
  logout: () => void;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const initialValues: AuthContextProps = {
  user: null,
  token: null,
  error: null,
  logout: () => null,
};

export const AuthContext = React.createContext<AuthContextProps>(initialValues);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  const logout = React.useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      token,
      error,
      logout,
    }),
    [user, token, error, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
