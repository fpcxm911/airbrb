import React from 'react';
import { Autocomplete, IconButton, Stack, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const PropertyBedroom = () => {
  const [bedrooms, setBedrooms] = React.useState([['', '']]);

  const handleOneMore = () => {
    setBedrooms([...bedrooms, ['', '']]);
    console.log(bedrooms);
  };

  const generateRoomRow = (bedroom, idx) => {
    return (
      <Stack direction='row' spacing={3} mb={1}>
        <Autocomplete
        freeSolo
          fullWidth
          id='hi'
          options={[1, 2, 3, 4]}
          renderInput={(params) => (
            <TextField {...params} label='Number of beds' />
          )}
        />
        <Autocomplete
          fullWidth
          id='hiasdf'
          options={bedroomTypeOption}
          renderInput={(params) => (
            <TextField {...params} label='Bedroom type' />
          )}
        />
        <IconButton onClick={() => console.log('wanna remove')}>
          <RemoveIcon />
        </IconButton>
      </Stack>
    );
  };
  return (
    <>
      {bedrooms.map((bedroom, idx) => generateRoomRow(bedroom, idx))}
      <IconButton onClick={handleOneMore} size='small'>
        Add a bedroom
        <AddIcon />
      </IconButton>
    </>
  );
};

const bedroomTypeOption = [
  { label: 'Shared Bedroom' },
  { label: 'Private Bedroom' },
  { label: 'Studio Bedroom' },
]

export default PropertyBedroom;
