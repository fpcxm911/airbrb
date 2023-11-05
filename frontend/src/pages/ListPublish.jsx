import * as React from 'react';
import ErrorDialog from '../components/ErrorPopup';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AvailabilityDate from '../components/AvailabilityDate';

const ListPublish = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    setErrorMessage('');
  }, []);

  const handleSubmit = async (event) => {
    console.log('wanna submit');
    props.update();
    props.close();
  }

  return (
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
                <AvailabilityDate />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      {showModal && <ErrorDialog content={errorMessage} close={setShowModal} />}
      </Dialog>
    </React.Fragment>
  );
}

export default ListPublish;
