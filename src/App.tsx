import React from 'react';

import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';

import { theme } from './utils/theme';

import './styles/tailwind.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="w-12 h-12 bg-red-600"></div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
