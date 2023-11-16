import React from 'react';
import Button from '@mui/material/Button';
import {
  Autocomplete,
  IconButton,
  Stack,
  TextField,
  DialogContentText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const PropertyBedroom = () => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [bedrooms, setBedrooms] = React.useState([
    { numberOfBeds: '', roomType: '' },
  ]);
  const [hiddenBedroomsInput, setHiddenBedroomsInput] = React.useState('');

  React.useEffect(() => {
    setHiddenBedroomsInput(JSON.stringify(bedrooms));
    setErrorMessage('');
  }, [bedrooms]);

  const handleOneMore = () => {
    setBedrooms([...bedrooms, { numberOfBeds: '', roomType: '' }]);
  };

  const handleBedNumberChange = (value, idx) => {
    const newBedrooms = [...bedrooms];
    newBedrooms[idx].numberOfBeds = value;
    setBedrooms(newBedrooms);
  };

  const handleRoomTypeChange = (value, idx) => {
    const newBedrooms = [...bedrooms];
    newBedrooms[idx].roomType = value;
    setBedrooms(newBedrooms);
  };

  const handleRemove = (idx) => {
    if (bedrooms.length === 1) {
      setErrorMessage('Your property must have at least one bedroom.');
      return;
    }
    const newBedrooms = [...bedrooms];
    newBedrooms.splice(idx, 1);
    setBedrooms(newBedrooms);
  };

  const roomInputRow = (bedrooms, idx) => {
    return (
      <Stack key={idx} direction='row' spacing={3} mb={1}>
        <Autocomplete
          fullWidth
          id={`bedNumberInput${idx}`}
          disableClearable
          options={bedNumberOption.map((type) => '' + type)}
          value={bedrooms.numberOfBeds}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onInputChange={(event, value) => handleBedNumberChange(value, idx)}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              type='number'
              label='Number of beds'
              id={`bedNumberInput${idx}`}
            />
          )}
        />
        <Autocomplete
          fullWidth
          id={`roomTypeInput${idx}`}
          disableClearable
          options={bedroomTypeOption.map((type) => '' + type)}
          value={bedrooms.roomType}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onInputChange={(event, value) => handleRoomTypeChange(value, idx)}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label='Bedroom type'
              id={`roomTypeInput${idx}`}
            />
          )}
        />
        <IconButton onClick={() => handleRemove(idx)}>
          <ClearOutlinedIcon />
        </IconButton>
      </Stack>
    );
  };
  return (
    <>
      {bedrooms.map((bedroom, idx) => roomInputRow(bedroom, idx))}
      <DialogContentText color='error' sx={{ mb: 2 }}>
        {errorMessage}
      </DialogContentText>
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
      <input type='hidden' name='bedrooms' value={hiddenBedroomsInput} />
    </>
  );
};

const bedroomTypeOption = ['Shared room', 'Private room', 'Hotel room'];

const bedNumberOption = ['1', '2', '3', '4', '5', '6'];

export default PropertyBedroom;
