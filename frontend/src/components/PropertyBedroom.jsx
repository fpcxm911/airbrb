import React from 'react';
import Button from '@mui/material/Button';
import { Autocomplete, IconButton, Stack, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const PropertyBedroom = () => {
  const [bedrooms, setBedrooms] = React.useState([['', '']]);

  const handleOneMore = () => {
    setBedrooms([...bedrooms, ['', '']]);
  };

  const handleBedNumberChange = (value, idx) => {
    const newBedrooms = [...bedrooms];
    newBedrooms[idx][0] = value;
    setBedrooms(newBedrooms);
  };

  const handleRoomTypeChange = (value, idx) => {
    const newBedrooms = [...bedrooms];
    newBedrooms[idx][1] = value;
    setBedrooms(newBedrooms);
  };

  const handleRemove = (idx) => {
    const newBedrooms = [...bedrooms];
    newBedrooms.splice(idx, 1);
    setBedrooms(newBedrooms);
  };

  const roomInputRow = (bedroom, idx) => {
    return (
      <Stack key={idx} direction='row' spacing={3} mb={1}>
        <Autocomplete
          freeSolo
          fullWidth
          options={bedNumberOption.map((type) => '' + type)}
          onInputChange={(event, value) => handleBedNumberChange(value, idx)}
          renderInput={(params) => (
            <TextField {...params} label='Number of beds' id={`bedNumberInput${idx}`} />
          )}
        />
        <Autocomplete
          fullWidth
          disableClearable
          options={bedroomTypeOption.map((type) => '' + type)}
          onInputChange={(event, value) => handleRoomTypeChange(value, idx)}
          renderInput={(params) => (
            <TextField {...params} label='Bedroom type' id={`roomTypeInput${idx}`} />
          )}
        />
        <IconButton onClick={() => handleRemove(idx)} sx={{ ml: 0 }}>
          <RemoveIcon/>
        </IconButton>
      </Stack>
    );
  };
  return (
    <>
      {bedrooms.map((bedroom, idx) => roomInputRow(bedroom, idx))}
      <Button
        fullWidth
        variant='text'
        component='label'
        startIcon={<AddIcon />}
        onClick={handleOneMore}
        size='small'
      >
        Add a bedroom
      </Button>
    </>
  );
};

const bedroomTypeOption = ['shared bedroom', 'private bedroom', 'studio'];

const bedNumberOption = ['1', '2', '3', '4', '5'];

export default PropertyBedroom;
