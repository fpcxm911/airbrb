import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import PropertyType from '../components/PropertyType';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PropertyAmenities from '../components/PropertyAmenities';
import PropertyBedroom from '../components/PropertyBedroom';
import ImageIcon from '@mui/icons-material/Image';
import DialogContentText from '@mui/material/DialogContentText';
import { apiCallBodyAuthen, fileToDataUrl, createMeta, createAddress } from './Helper'

export default function Listcreate (props) {
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('photo') && data.get('photo').name && JSON.parse(data.get('bedrooms')).length > 0) {
      try {
        const thumbnail = await fileToDataUrl(data.get('photo'));
        const token = localStorage.getItem('token');
        const title = data.get('title');
        const country = data.get('country');
        const city = data.get('city');
        const street = data.get('street');
        const postcode = data.get('postcode');
        const address = createAddress(country, city, street, postcode);
        const bathNum = data.get('bath');
        const price = data.get('price');
        const propertyType = data.get('prop');
        const bedroomsArray = JSON.parse(data.get('bedrooms'));
        const amenitiesList = data.get('amenities') === '' ? [] : data.get('amenities').split(',')
        const youtubeUrl = data.get('youtube') ? data.get('youtube') : null;
        const propertyImages = [];
        const metadata = createMeta(bathNum, propertyType, bedroomsArray, amenitiesList, youtubeUrl, propertyImages);
        const res = await apiCallBodyAuthen('listings/new', token, {
          title,
          address,
          price,
          thumbnail,
          metadata
        }, 'POST');
        if (res.error) {
          setErrorMessage(res.error)
        } else {
          props.update();
          props.close();
        }
      } catch (error) {
        setErrorMessage(error);
      }
    } else {
      (JSON.parse(data.get('bedrooms')).length === 0) && setErrorMessage('Please add at least one bedroom');
      (!data.get('photo') || !data.get('photo').name) && setErrorMessage('Please upload a photo');
    }
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
            <MapsHomeWorkIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Create your Hosted Listing
          </Typography>
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3, overflowY: 'auto' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='listing-create-title'
                  label='Title'
                  name='title'
                  autoComplete='title'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label='Country'
                  name='country'
                  autoComplete='country'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label='City'
                  name='city'
                  autoComplete='city'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label='Street'
                  name='street'
                  autoComplete='street'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label='Postcode'
                  name='postcode'
                  autoComplete='postcode'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="bath"
                  label="Bathrooms"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="price"
                  label="Price/Night"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <PropertyType />
              </Grid>
              <Grid item xs={12}>
                <PropertyBedroom />
              </Grid>
              <Grid item xs={12}>
                <PropertyAmenities />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="youtube"
                  label="Youtube url (Optional)"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="text"
                  component="label"
                  startIcon={<ImageIcon />}
                >
                  Upload Thumbnail
                  <input
                    type="file"
                    hidden
                    name = 'photo'
                    accept="image/jpeg, image/jpg, image/png"
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <DialogContentText color='error' sx={{ textAlign: 'center' }} xs={12}>
                  {errorMessage}
                </DialogContentText>
              </Grid>

            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 5, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
