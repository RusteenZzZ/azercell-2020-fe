import React from 'react';

import { Button, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { ROUTES } from '../routes';
import { api } from '../utils/axios';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .test(
      'length',
      'Password should be at least 6 characters',
      (value) => (value?.length || 0) >= 6,
    ),
  confirm: yup
    .string()
    .required('Password confirm is required')
    .test('passwords-match', 'Passwords should match', function (value) {
      return this.parent.password === value || false;
    }),
});

export const Register: React.FC = () => {
  const [error, setError] = React.useState<string>('');
  const handleSubmit = React.useCallback(({ name, email, password }) => {
    api.post('/register', { name, surname: '', email, password });
  }, []);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirm: '',
        name: '',
      }}
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
            name="name"
            placeholder="First name"
            variant="outlined"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              startAdornment: (
                <PersonOutlineIcon fontSize="small" className="mr-2" />
              ),
            }}
            helperText={touched.name ? errors.name : ''}
            error={touched.name && !!errors.name}
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
            type="email"
            name="email"
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
            name="password"
            type="password"
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
          <TextField
            size="small"
            className="mb-6"
            name="confirm"
            type="password"
            placeholder="Confirm password"
            variant="outlined"
            value={values.confirm}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              startAdornment: (
                <LockOutlinedIcon fontSize="small" className="mr-2" />
              ),
            }}
            helperText={touched.confirm ? errors.confirm : ''}
            error={touched.confirm && !!errors.confirm}
            FormHelperTextProps={{
              style: {
                height: 0,
              },
            }}
            fullWidth
          />
          <Link
            to={ROUTES.login}
            className="block mb-2 text-xs text-right text-gray-600 underline"
          >
            Already registered?
          </Link>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="font-bold"
            fullWidth
          >
            Register
          </Button>

          <div className="mt-4 text-center text-red-600">
            <span>{error}</span>
          </div>
        </form>
      )}
    </Formik>
  );
};
