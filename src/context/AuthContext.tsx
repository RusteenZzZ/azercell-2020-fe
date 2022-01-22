import React from 'react';

import { useNavigate } from 'react-router-dom';

import { addAuthHeader, api } from '../utils/axios';

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
  isAuth: boolean;
  loading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  setError: (error: string | null) => void;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const initialValues: AuthContextProps = {
  user: null,
  token: null,
  error: null,
  isAuth: false,
  loading: false,
  logout: () => null,
  login: () => null,
  setError: () => null,
};

export const AuthContext = React.createContext<AuthContextProps>(initialValues);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem('token'),
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  const isAuth = React.useMemo<boolean>(() => !!user && !!token, [user, token]);

  const logout = React.useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }, []);

  const login = React.useCallback(
    async (email: string, password: string) => {
      try {
        if (loading) return;
        setLoading(true);
        const response = await api.post('/login', { email, password });

        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      } catch (error_) {
        console.log(error_);
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  React.useEffect(() => {
    if (!token || user || loading) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await api.get('/get-user', {
          headers: { Authorization: `Bearer ${token}` },
          params: { token: token },
        });

        if (response.data) setUser(response.data);
        else logout();
      } catch (error_) {
        console.log(error_);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, user, loading, logout]);

  const value = React.useMemo(
    () => ({
      user,
      token,
      error,
      isAuth,
      loading,
      logout,
      login,
      setError,
    }),
    [user, token, error, isAuth, loading, logout, login, setError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
