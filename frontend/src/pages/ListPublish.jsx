import * as React from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AvailabilityRange from '../components/AvailabilityRange';
import Button from '@mui/material/Button';
import { apiCallBodyAuthen } from './Helper';

const ListPublish = (props) => {
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    setErrorMessage('');
  }, []);

  const handleSubmit = async (event) => {
    setErrorMessage('');
    event.preventDefault();
    const datesRangeStrArr = JSON.parse(new FormData(event.currentTarget).get('dates'));
    checkDatesOverlap(datesRangeStrArr);
    const availability = createAvailbilityArray(datesRangeStrArr);
    const token = localStorage.getItem('token');
    const listingid = props.listingid;
    const res = await apiCallBodyAuthen(`listings/publish/${listingid}`, token, { availability }, 'PUT');
    if (res.error) {
      setErrorMessage(res.error)
    } else {
      props.update();
      props.close();
      console.log('published!!!');
    }
  }

  /**
   * Generates an availability array based on the given array of date strings.
   *
   * @param {Array<string>} datesStrArr - An array of date strings.
   * @return {Array<{start: string, end: string}>} The availability array with start and end dates.
   */
  const createAvailbilityArray = (datesStrArr) => {
    return sortDates(datesStrArr).map(dateRange => ({ start: dateRange.start.substring(0, 10), end: dateRange.end.substring(0, 10) }));
  }
  //   const mergeDates = (datesStr) => {
  //     const sortedDates = sortDates(datesStr);
  //     const mergedDates = sortedDates.reduce((acc, currentRange) => {
  //       const previousRange = acc[acc.length - 1];
  //       if (previousRange && previousRange.end >= currentRange.start) {
  //         previousRange.end = currentRange.end;
  //       } else {
  //         acc.push({ ...currentRange });
  //       }
  //       return acc;
  //     }, []);
  //     return mergedDates;
  //   }

  const sortDates = (datesStrArr) => {
    const dates = [];
    datesStrArr.forEach((str) => {
      dates.push({
        start: new Date(str.start),
        end: new Date(str.end)
      })
    });
    dates.sort((a, b) => a.start - b.start);
    return (dates.map(dateObj => ({
      start: dateObj.start.toISOString(),
      end: dateObj.end.toISOString()
    })));
  }

  const checkDatesOverlap = (datesRangeStrArr) => {
    const dates = [];
    datesRangeStrArr.forEach((str) => {
      dates.push({
        start: new Date(str.start),
        end: new Date(str.end)
      })
    });
    for (let i = 0; i < dates.length; i++) {
      for (let j = i + 1; j < dates.length; j++) {
        if (dates[i].start <= dates[j].end && dates[j].start <= dates[i].end) {
          setErrorMessage(`Availability overlap between row ${i + 1} and ${j + 1} `);
          return;
        }
      }
    }
  }

  return (
    <>
      <React.Fragment>
        <Dialog
        onClose={props.close}
        open
        PaperProps={{ sx: { borderRadius: 6 } }}
        >
        <IconButton
          aria-label="close"
          onClick={props.close}
          size='small'
          sx={{
            position: 'absolute',
            right: 7,
            top: 7,
          }}
        >
            <CloseIcon />
        </IconButton>
          <DialogContent dividers sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            ml: 1.5,
            mr: 1.5,
          }}>
            <Avatar sx={{ m: 1, bgcolor: '#00a3fa' }}>
              <TodayOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Publish your Listing
            </Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AvailabilityRange />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
            <DialogContentText color='error' sx={{ mb: 2 }}>
                {errorMessage}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </>

  );
}

export default ListPublish;
