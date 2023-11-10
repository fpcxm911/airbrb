import * as React from 'react';
import { useContext, Context } from '../Context';
import { Button } from '@mui/material';
import Icon from '@mdi/react';
import { mdiBed } from '@mdi/js';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ConfirmPopup from '../components/ConfirmPopup';
import AvailabilityRange from '../components/AvailabilityRange';
import { apiCallBodyAuthen } from './Helper';
import ErrorDialog from '../components/ErrorPopup';

const ListingBooking = (props) => {
  const { getters } = useContext(Context);
  const [errorMessage, setErrorMessage] = React.useState({ title: '', body: '' });
  const [showConfirmPopup, setShowConfirmPopup] = React.useState(false);
  const [confirmMessage, setConfirmMessage] = React.useState('');
  const [submitClickable, setSubmitClickable] = React.useState(false);
  const [checkinISO, setCheckinISO] = React.useState('');
  const [checkoutISO, setCheckoutISO] = React.useState('');
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  React.useEffect(() => {
    const numOfNights = Math.abs(new Date(checkinISO) - new Date(checkoutISO)) / 1000 / 60 / 60 / 24;
    setConfirmMessage('You are booking for ' + numOfNights + ' night(s). From ' + String(new Date(checkinISO)).substring(0, 15) + ' to ' + String(new Date(checkoutISO)).substring(0, 15) + '.');
  }, [checkinISO, checkoutISO]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dates = JSON.parse(new FormData(e.currentTarget).get('dates'))[0];
    setCheckinISO(new Date(dates.start).toISOString());
    setCheckoutISO(new Date(dates.end).toISOString());
    setShowConfirmPopup(true);
  };

  const handleConfirm = async () => {
    console.log('confirming');
    console.log(`price: ${props.price}`);
    console.log(`listingid: ${props.listingid}`);
    const totalPrice = String((Math.abs(new Date(checkinISO) - new Date(checkoutISO)) / 1000 / 60 / 60 / 24) * props.price);
    console.log(`totalPrice: ${totalPrice}`);
    const res = await apiCallBodyAuthen(`bookings/new/${props.listingid}`, getters.token, {
      dateRange: { start: checkinISO, end: checkoutISO },
      totalPrice
    }, 'POST');
    if (res.error) {
      setShowErrorModal(true);
      setErrorMessage({ title: 'Fail to make booking', body: res.error });
    } else {
      console.log('success');
      setShowConfirmPopup(false);
      props.close();
    }
  };

  return (
    <React.Fragment>
      <Button onClick={props.close}>close</Button>
      <Dialog
        onClose={props.close}
        open
        PaperProps={{ sx: { borderRadius: 6 } }}
      >
        <IconButton
          aria-label='close'
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
        <DialogContent
          dividers
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            ml: 1.5,
            mr: 1.5,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#00a3fa' }}>
            <Icon path={mdiBed} size={1} />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Make a Booking
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ pt: 3, overflowY: 'auto' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <AvailabilityRange setSubmit={setSubmitClickable} singleRange={true}/>
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 5, mb: 2 }}
              disabled={!submitClickable}
            >
              Submit
            </Button>
          </Box>
        </DialogContent>
        {showConfirmPopup && (
          <ConfirmPopup
            cancel={() => setShowConfirmPopup(false)}
            confirm={handleConfirm}
            content={confirmMessage}
            title={'Confirmation'}
          />
        )}
        {showErrorModal && (<ErrorDialog close={() => setShowErrorModal(false)} content={errorMessage} />)}
      </Dialog>
    </React.Fragment>
  );
};

export default ListingBooking;
