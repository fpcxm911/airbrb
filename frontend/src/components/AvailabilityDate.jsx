import { Autocomplete, Button, IconButton, Stack, TextField } from '@mui/material';
import React from 'react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddIcon from '@mui/icons-material/Add';

const AvailabilityDate = () => {
  const [dates, setDates] = React.useState([{ startDate: '', endDate: '' }]);
  const [hiddenDatesInput, setHiddenDatesInput] = React.useState('');

  React.useEffect(() => {
    setHiddenDatesInput(JSON.stringify(dates));
  }, [dates]);

  const handleOneMore = () => {
    console.log('wanna add date range');
  }

  const handleStartDateChange = (value, idx) => {
    const newDates = [...dates];
    newDates[idx].startDate = value;
    setDates(newDates);
  }

  const handleEndDateChange = (value, idx) => {
    const newDates = [...dates];
    newDates[idx].endDate = value;
    setDates(newDates);
  }

  const handleRemove = (idx) => {
    const newDates = [...dates];
    newDates.splice(idx, 1);
    setDates(newDates);
  }

  const dateInputRow = (date, idx) => {
    return (
        <Stack key={idx} direction='row' spacing={3} mb={1}>
            {/* // TODO autocomplete tag may not be suitable for date, consider mui other component option */}
            <Autocomplete
              fullWidth
              id={`startDateInput${idx}`}
              disableClearable
              onInputChange={(event, value) => handleStartDateChange(value, idx)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  type='date'
                  label='Start date'
                  id={`startDateInput${idx}`}
                />
              )}
            />
            <Autocomplete
              fullWidth
              id={`endDateInput${idx}`}
              disableClearable
              onInputChange={(event, value) => handleEndDateChange(value, idx)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  type='date'
                  label='End date'
                  id={`endDateInput${idx}`}
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
      {dates.map((date, idx) => dateInputRow(date, idx))}
      <Button
        fullWidth
        variant='text'
        component='label'
        startIcon={<AddIcon />}
        onClick={handleOneMore}
        size='small'
      >
        Add an availability range
      </Button>
      <input type='hidden' name='dates' value={hiddenDatesInput} />
    </>
  )
}

export default AvailabilityDate;
