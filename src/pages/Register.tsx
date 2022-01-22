import React from 'react';

import { Button, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { ROUTES } from '../routes';

const validationSchema = yup.object().shape({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .test('length', 'Password should', (value) => (value?.length || 0) > 6),
  confirm: yup
    .string()
    .required('Password confirm is required')
    .test('passwords-match', 'Passwords should match', function (value) {
      return this.parent.password === value || false;
    }),
});

export const Register: React.FC = () => {
  const [error, setError] = React.useState<string>('');
  const handleSubmit = React.useCallback(() => {
    // todo
  }, []);

  return (
    <Formik
      initialValues={{
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        confirm: '',
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
            name="firstname"
            placeholder="First name"
            variant="outlined"
            value={values.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              startAdornment: (
                <PersonOutlineIcon fontSize="small" className="mr-2" />
              ),
            }}
            helperText={touched.firstname ? errors.firstname : ''}
            error={touched.firstname && !!errors.firstname}
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
            name="lastname"
            placeholder="Last name"
            variant="outlined"
            value={values.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              startAdornment: (
                <PersonOutlineIcon fontSize="small" className="mr-2" />
              ),
            }}
            helperText={touched.lastname ? errors.lastname : ''}
            error={touched.lastname && !!errors.lastname}
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
          <Link
            to={ROUTES.register}
            className="block mb-2 text-xs text-right text-gray-600 underline"
          >
            Already registered?
          </Link>
          <Button
            variant="contained"
            color="primary"
            className="font-bold"
            fullWidth
          >
            Register
          </Button>
        </form>
      )}
    </Formik>
  );
};
