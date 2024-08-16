import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

function SearchBar({ searchText, setSearchParams, handleSearchFilter, clearSearch }) {
  const handleChange = (e) => {
      setSearchParams({search: e.target.value});
      handleSearchFilter(e.target.value);
  };

  return (
    <TextField
        id="search-bar"
        className="search-bar-root"
        value={searchText}
        onChange={handleChange}
        variant="outlined"
        InputProps={{
            startAdornment: 
                <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'white' }}/>
                </InputAdornment>,
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={clearSearch}>
                        <CancelIcon />
                    </IconButton>
                </InputAdornment>
            ),
        }}
    />
  );
}

export default SearchBar