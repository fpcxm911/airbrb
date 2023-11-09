import * as React from 'react';
import { TextField, Grid } from '@mui/material';

const DateSearch = (props) => {
  const [dates, setDates] = React.useState({ start: '', end: '' });
  const [hiddenInput, setHiddenInput] = React.useState('');
  const setErrorMessage = props.setErrorMessage;
  const setClickable = props.setSearch;
  React.useEffect(() => {
    if (!checkDates(dates)) {
      setClickable(false);
      return;
    }
    setClickable(true);
    setHiddenInput(JSON.stringify(dates));
  }, [dates]);

  const handleStartDateChange = (value) => {
    const newDates = { ...dates };
    newDates.start = value;
    setDates(newDates);
  }
  const handleEndDateChange = (value) => {
    const newDates = { ...dates };
    newDates.end = value;
    setDates(newDates);
  }

  const checkDates = (item) => {
    if (item.start === '' || item.end === '') {
      return true;
    }
    if (new Date(item.start) >= new Date(item.end)) {
      setErrorMessage('Start date must precede end date');
      return false;
    }
    setErrorMessage('');
    return true;
  }

  return (
    <>
      <Grid container spacing={0.95} alignContent={'center'} justifyContent={'center'}>
        <Grid item xs={12} sx={{ alignItems: 'center' }}>
          <TextField
            required
            size='small'
            type='date'
            InputLabelProps={{ shrink: true }}
            value={dates.start}
            label={'Start date'}
            onChange={(e) => handleStartDateChange(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sx={{ alignItems: 'center' }}>
          <TextField
            required
            size='small'
            type='date'
            InputLabelProps={{ shrink: true }}
            value={dates.end}
            label={'End date'}
            onChange={(e) => handleEndDateChange(e.target.value)}
          />
        </Grid>
      </Grid>
      <input type='hidden' name='dates' value={hiddenInput} />
    </>
  )
}

export default DateSearch;
