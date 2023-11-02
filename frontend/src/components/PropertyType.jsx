import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function PropertyType () {
  return (
    <Autocomplete
      disablePortal
      options={propertyOptions}
      renderInput={(params) => <TextField {...params} label="Property type" name='prop' required/>}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const propertyOptions = [
  { label: 'House' },
  { label: 'Apartment' },
  { label: 'Loft', },
];
