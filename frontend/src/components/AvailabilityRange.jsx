import { Button, IconButton, Stack, TextField } from '@mui/material';
import React from 'react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddIcon from '@mui/icons-material/Add';
import DialogContentText from '@mui/material/DialogContentText';

const AvailabilityRange = () => {
  const [dates, setDates] = React.useState([{ start: '', end: '' }]);
  const [hiddenDatesInput, setHiddenDatesInput] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    checkDates();
    setHiddenDatesInput(JSON.stringify(dates));
  }, [dates]);

  const handleOneMore = () => {
    setDates([...dates, { start: '', end: '' }]);
  }

  const handleStartDateChange = (value, idx) => {
    const newDates = [...dates];
    newDates[idx].start = value;
    setDates(newDates);
    console.log(newDates);
  }

  const handleEndDateChange = (value, idx) => {
    const newDates = [...dates];
    newDates[idx].end = value;
    setDates(newDates);
  }

  const handleRemove = (idx) => {
    if (dates.length === 1) {
      setErrorMessage('Please fill in at least one date range.');
      return;
    }
    const newDates = [...dates];
    newDates.splice(idx, 1);
    setDates(newDates);
  }

  const checkDates = () => {
    // TODO check if dates overlap each other
    for (const [idx, date] of dates.entries()) {
      const date1 = new Date(date.start);
      const date2 = new Date(date.end);
      if (date1 >= date2) {
        setErrorMessage(`End date ${idx + 1} must be after start date ${idx + 1}.`);
        return;
      }
    }
    setErrorMessage('');
  }

  const dateInputRow = (date, idx) => {
    return (
        <Stack key={idx} direction='row' spacing={3} mb={1}>
            {/* // TODO autocomplete tag may not be suitable for date, consider mui other component option */}
            <TextField
              required
              fullWidth
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
              label={`Start date ${idx + 1}`}
              id={`startDateInput${idx}`}
              onChange={(e) => handleStartDateChange(e.target.value, idx)}
            />
            <TextField
              required
              fullWidth
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
              label={`End date ${idx + 1}`}
              id={`endDateInput${idx}`}
              onChange={(e) => handleEndDateChange(e.target.value, idx)}
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
        Add availability range
      </Button>
      <input type='hidden' name='dates' value={hiddenDatesInput} />
    </>
  )
}

export default AvailabilityRange;
