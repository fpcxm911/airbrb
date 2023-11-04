import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function PropertyType (props) {
  console.log(props);
  return (
    <Autocomplete
      disablePortal
      options={propertyOptions}
      defaultValue={props.defaultValue}
      renderInput={(params) => <TextField {...params} label="Property type" name='prop' required/>}
    />
  );
}

const propertyOptions = [
  { label: 'House' },
  { label: 'Apartment' },
  { label: 'Loft', },
];
