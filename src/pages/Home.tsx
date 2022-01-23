import React from 'react';

import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { ROUTES } from '../routes';

export const Home: React.FC = () => {
  return (
    <div className="absolute top-0 flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center">
        <div className="flex mb-4">
          <h1 className="text-6xl font-bold md:text-9xl">Examut</h1>
          <span className="md:text-[12rem] text-9xl leading-3 text-primary md:leading-[84px]">
            .
          </span>
        </div>

        <Link to={ROUTES.login}>
          <Button
            size="large"
            color="primary"
            variant="contained"
            className="font-bold"
            disableElevation
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};
