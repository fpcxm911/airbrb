import { Button, IconButton, Stack, TextField, Grid } from '@mui/material';
import * as React from 'react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddIcon from '@mui/icons-material/Add';
import DialogContentText from '@mui/material/DialogContentText';

const AvailabilityRange = (props) => {
  const setSubmit = props.setSubmit;
  const [dates, setDates] = React.useState([{ start: '', end: '' }]);
  const [hiddenDatesInput, setHiddenDatesInput] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    if (!checkDates(dates)) {
      setSubmit(false);
      return;
    }
    setSubmit(true);
    setHiddenDatesInput(JSON.stringify(dates));
  }, [dates]);

  const handleOneMore = () => {
    setDates([...dates, { start: '', end: '' }]);
  };

  const handleStartDateChange = (value, idx) => {
    const newDates = [...dates];
    newDates[idx].start = value;
    setDates(newDates);
  };

  const handleEndDateChange = (value, idx) => {
    const newDates = [...dates];
    newDates[idx].end = value;
    setDates(newDates);
  };

  const handleRemove = (idx) => {
    if (dates.length === 1) {
      setErrorMessage('Please fill in at least one date range.');
      return;
    }
    const newDates = [...dates];
    newDates.splice(idx, 1);
    setDates(newDates);
  };

  const checkDates = (datesRangeStrArr) => {
    const checkDatesOutofAvailability = (datesRangeStrArr, availability) => {
      const checkinStr = datesRangeStrArr[0].start;
      const checkoutStr = datesRangeStrArr[0].end;
      const todayISOString = new Date().toISOString().split('T')[0];
      if (checkinStr === '' || checkoutStr === '') return false;
      if (checkinStr < todayISOString) {
        setErrorMessage('Check-in date cannot be in the past');
        return false;
      }
      for (const availRange of availability) {
        const availStart = new Date(availRange.start)
          .toISOString()
          .split('T')[0];
        const availEnd = new Date(availRange.end).toISOString().split('T')[0];
        if (availStart <= checkinStr && availEnd >= checkoutStr) {
          return true;
        }
      }
      setErrorMessage('Accommodation is unavailable during the time.');
      return false;
    };

    /**
     * Checks if any of the dates in the given array overlap with each other.
     *
     * @param {Array} datesRangeStrArr - An array of date range objects, each with start and end dates in string.
     * @return {Boolean} Returns true if there are no overlapping dates, false otherwise.
     */
    const checkDatesOverlap = (datesRangeStrArr) => {
      const dates = [];
      datesRangeStrArr.forEach((str) => {
        dates.push({
          start: new Date(str.start),
          end: new Date(str.end),
        });
      });
      for (let i = 0; i < dates.length; i++) {
        for (let j = i + 1; j < dates.length; j++) {
          if (
            dates[i].start <= dates[j].end &&
            dates[j].start <= dates[i].end
          ) {
            return [false, i, j];
          }
        }
      }
      return [true, -1, -1];
    };

    const checkEachStartEnd = (datesRangeStrArr) => {
      for (const idx in datesRangeStrArr) {
        const item = datesRangeStrArr[idx];
        if (item.start === '' || item.end === '') {
          continue;
        }
        if (item.start === item.end) {
          return [false, idx];
        }
        if (new Date(item.start) > new Date(item.end)) {
          return [false, idx];
        }
      }
      return [true, -1];
    };

    const [differCheckPass, idx] = checkEachStartEnd(datesRangeStrArr);
    if (!differCheckPass) {
      if (props.singleRange) {
        setErrorMessage('Check-in date must precede check-out date');
        return false;
      } else {
        setErrorMessage(
          `Start date must precede end date in row ${Number(idx) + 1}`
        );
        return false;
      }
    }
    const [overlapPass, i, j] = checkDatesOverlap(datesRangeStrArr);
    if (!overlapPass) {
      setErrorMessage(
        `Availability overlap between row ${Number(i) + 1} and ${
          Number(j) + 1
        } `
      );
      return false;
    }
    setErrorMessage('');

    if (props.singleRange) {
      if (!checkDatesOutofAvailability(datesRangeStrArr, props.availability)) {
        return false;
      }
    }
    return true;
  };

  const dateInputRow = (dates, idx) => {
    return (
      <Stack key={idx} direction='row' spacing={3} mb={1}>
        <Grid
          container
          spacing={1}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Grid item xs={5}>
            <TextField
              required
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
              value={dates.start}
              label={
                props.singleRange ? 'Check-in date' : `Start date ${idx + 1}`
              }
              id={`startDateInput${idx}`}
              onChange={(e) => handleStartDateChange(e.target.value, idx)}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              required
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
              value={dates.end}
              label={
                props.singleRange ? 'Check-out date' : `End date ${idx + 1}`
              }
              id={`endDateInput${idx}`}
              onChange={(e) => handleEndDateChange(e.target.value, idx)}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={2}>
            {!props.singleRange && (
              <IconButton
                onClick={() => handleRemove(idx)}
                id='removeInputRole'
              >
                <ClearOutlinedIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Stack>
    );
  };

  if (props.singleRange) {
    return (
      <>
        {dates.map((date, idx) => dateInputRow(date, idx))}
        <DialogContentText color='error' sx={{ mb: 2 }}>
          {errorMessage}
        </DialogContentText>
        <input type='hidden' name='dates' value={hiddenDatesInput} />
      </>
    );
  } else {
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
          id='addAvailability'
        >
          Add availability range
        </Button>
        <input type='hidden' name='dates' value={hiddenDatesInput} />
      </>
    );
  }
};

export default AvailabilityRange;
