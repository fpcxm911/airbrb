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
// import PropertyType from '../components/PropertyType';
// import Autocomplete from '@mui/material/Autocomplete';
import PropertyType from '../components/PropertyType';
// import { data } from './Helper';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PropertyAmenities from '../components/PropertyAmenities';
import ImageIcon from '@mui/icons-material/Image';
import { fileToDataUrl } from './Helper';
// import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX, apiCallPostNoAuthen } from './Helper'

export default function Listcreate (props) {
  // console.log(selectedCountry);
  // console.log(selectedCity);
  // console.log(selectedStreet);
  // console.log(selectedPostcode);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('title'));
    console.log(data.get('country'));
    console.log(data.get('city'));
    console.log(data.get('street'));
    console.log(data.get('postcode'));
    console.log(data.get('bath'));
    console.log(data.get('price'));
    console.log(data.get('prop'));
    const amenitiesList = data.get('amenities').split(',')
    console.log(amenitiesList);
    console.log(data.get('photo'));
    try {
      const imgUrl = await fileToDataUrl(data.get('photo'));
      console.log(imgUrl)
    } catch (error) {
      console.log('error')
    }
    console.log(data.get('amenities'));
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
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Avatar sx={{ m: 1, bgcolor: '#00a3fa' }}>
            <MapsHomeWorkIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Create your Hosted Listing
          </Typography>
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                  label="Price/Week"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <PropertyType />
              </Grid>
              <Grid item xs={12}>
                <PropertyAmenities />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="text"
                  component="label"
                  startIcon={<ImageIcon />}
                >
                  Upload Photo
                  <input
                    type="file"
                    hidden
                    name = 'photo'
                  />
                </Button>
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
