import React from 'react';

import { Button, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { AuthContext } from '../context/AuthContext';
import { ROUTES } from '../routes';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { error, isAuth, loading, login, setError } =
    React.useContext(AuthContext);
  const handleSubmit = React.useCallback(
    async ({ email, password }) => {
      await login(email, password);
      navigate(ROUTES.dashboard);
    },
    [login, navigate],
  );

  React.useEffect(() => {
    if (!isAuth || loading) return;

    navigate(ROUTES.dashboard);
  }, [isAuth, loading, navigate]);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form
          onSubmit={handleSubmit}
          onChange={() => setError('')}
          className="absolute w-full p-4 border rounded top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 md:p-10 md:w-[400px]"
        >
          <TextField
            size="small"
            className="mb-6"
            name="email"
            type="email"
            placeholder="Email"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              startAdornment: (
                <MailOutlinedIcon fontSize="small" className="mr-2" />
              ),
            }}
            helperText={touched.email ? errors.email : ''}
            error={touched.email && !!errors.email}
            FormHelperTextProps={{
              style: {
                height: 0,
              },
            }}
            fullWidth
          />
          <TextField
            size="small"
            className="mb-6"
            type="password"
            name="password"
            placeholder="Password"
            variant="outlined"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              startAdornment: (
                <LockOutlinedIcon fontSize="small" className="mr-2" />
              ),
            }}
            helperText={touched.password ? errors.password : ''}
            error={touched.password && !!errors.password}
            FormHelperTextProps={{
              style: {
                height: 0,
              },
            }}
            fullWidth
          />
          <div className="flex justify-end mb-2">
            <Link
              to={ROUTES.register}
              className="text-xs text-gray-600 underline"
            >
              Don't have an account?
            </Link>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="font-bold"
            fullWidth
          >
            Login
          </Button>
        </form>
      )}
    </Formik>
  );
};
