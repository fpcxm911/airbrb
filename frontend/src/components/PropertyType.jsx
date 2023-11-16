import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function PropertyType () {
  return (
    <Autocomplete
      disablePortal
      options={propertyOptions}
      renderInput={(params) => (
        <TextField {...params} label='Property type' name='prop' required />
      )}
    />
  );
}

const propertyOptions = [
  { label: 'House' },
  { label: 'Apartment' },
  { label: 'Loft' },
];
