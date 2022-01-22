import React from 'react';

import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

type SearchBarProps = {
  query: string;
  onChange: (query: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ query, onChange }) => {
  return (
    <TextField
      InputProps={{ startAdornment: <SearchIcon /> }}
      value={query}
      variant="outlined"
      placeholder="Filter exams"
      onChange={(e) => onChange(e.target.value.trimStart())}
      size="small"
      fullWidth
    />
  );
};
