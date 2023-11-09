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

const ListingBooking = (props) => {
  const { getters } = useContext(Context);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showConfirmPopup, setShowConfirmPopup] = React.useState(false);
  const [confirmMessage, setConfirmMessage] = React.useState('');
  const [submitClickable, setSubmitClickable] = React.useState(false);

  React.useEffect(() => {
    setErrorMessage('');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('wanna submit');
    const data = new FormData(e.currentTarget).get('dates');
    console.log(data);
    setConfirmMessage('this should be a date range, number of nights shown in confirmation');
    setShowConfirmPopup(true);
  };

  const handleConfirm = async () => {
    console.log('handle confirm!!call api!!!');
    setShowConfirmPopup(false);
    props.close();
  };

  return (
    <React.Fragment>
      <p>{getters.email}</p>
      {errorMessage}
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
      </Dialog>
    </React.Fragment>
  );
};

export default ListingBooking;
