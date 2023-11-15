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
import Typography from '@mui/material/Typography';
import PropertyType from '../components/PropertyType';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PropertyAmenities from '../components/PropertyAmenities';
import PropertyBedroom from '../components/PropertyBedroom';
import ImageIcon from '@mui/icons-material/Image';
import {
  apiCallBodyAuthen,
  fileToDataUrl,
  createMeta,
  createAddress,
} from './Helper';
import { mdiCodeJson } from '@mdi/js';
import Icon from '@mdi/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Listcreate (props) {
  const toastError = (msg) => toast.error(msg);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      data.get('photo') &&
      data.get('photo').name &&
      JSON.parse(data.get('bedrooms')).length > 0
    ) {
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
        const amenitiesList =
          data.get('amenities') === '' ? [] : data.get('amenities').split(',');
        const youtubeUrl = data.get('youtube') ? data.get('youtube') : null;
        const propertyImages = [];
        const metadata = createMeta(
          bathNum,
          propertyType,
          bedroomsArray,
          amenitiesList,
          youtubeUrl,
          propertyImages
        );
        const res = await apiCallBodyAuthen(
          'listings/new',
          token,
          {
            title,
            address,
            price,
            thumbnail,
            metadata,
          },
          'POST'
        );
        if (res.error) {
          toastError(res.error);
        } else {
          props.update();
          props.close();
        }
      } catch (error) {
        toastError(error.toString());
      }
    } else {
      JSON.parse(data.get('bedrooms')).length === 0 &&
        toastError('Please add at least one bedroom');
      (!data.get('photo') || !data.get('photo').name) &&
        toastError('Please upload a thumbnail');
    }
  };

  const handleJsonCreate = async (e) => {
    e.preventDefault();
    console.log('receiving json file');
    const file = e.target.files[0];
    if (!e.target.files[0].name.endsWith('.json')) {
      toastError('Please upload only JSON file');
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const contents = e.target.result;
      const json = JSON.parse(contents);
      if (!validateJson(json)) {
        toastError('Fail to create listing: invalid data structure in JSON file');
        e.currentTarget.value = '';
      } else {
        console.log(json);
        const token = localStorage.getItem('token');
        const res = await apiCallBodyAuthen('listings/new', token, json, 'POST');
        if (res.error) {
          toastError(res.error);
        } else {
          props.update();
          props.close();
        }
      }
    };
    reader.readAsText(file);
  };

  const validateJson = (data) => {
    if (!data.title || !data.address || !data.price || !data.thumbnail) {
      return false;
    }

    if (
      !data.metadata ||
      !data.metadata.propertyType ||
      !data.metadata.amenities ||
      !data.metadata.bedrooms ||
      !data.metadata.numberOfBathrooms ||
      !data.metadata.youtubeUrl ||
      !data.metadata.propertyImages
    ) {
      toastError('JSON file has invalid metadata structure');
      return false;
    }

    for (const amenity of data.metadata.amenities) {
      if (typeof amenity !== 'string') {
        return false;
      }
    }

    if (!Array.isArray(data.metadata.bedrooms)) {
      toastError('JSON file has invalid metadata structure');
      return false;
    }
    if (data.metadata.bedrooms.length === 0) {
      toastError('JSON file must have at least one bedroom');
      return false;
    }

    if (data.thumbnail === '') {
      toastError('JSON file must have a thumbnail in dataURL');
      return false;
    }

    for (const bedroom of data.metadata.bedrooms) {
      if (
        typeof bedroom !== 'object' ||
        !bedroom.numberOfBeds ||
        !bedroom.roomType
      ) {
        return false;
      }
    }

    if (typeof data.metadata.numberOfBathrooms !== 'number') {
      return false;
    }

    if (
      !Array.isArray(data.metadata.propertyImages) ||
      typeof data.metadata.youtubeUrl !== 'string'
    ) {
      return false;
    }

    return true;
  };

  return (
    <React.Fragment>
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
            <MapsHomeWorkIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Create your Hosted Listing
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ pt: 3, overflowY: 'auto' }}
          >
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
                  type='number'
                  name='bath'
                  label='Bathrooms'
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type='number'
                  name='price'
                  label='Price/Night'
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
                  type='text'
                  name='youtube'
                  label='Youtube url (Optional)'
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant='text'
                  component='label'
                  startIcon={<ImageIcon />}
                >
                  Upload Thumbnail
                  <input
                    type='file'
                    hidden
                    name='photo'
                    accept='image/jpeg, image/jpg, image/png'
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant='text'
                  component='label'
                  startIcon={<Icon path={mdiCodeJson} size={1} />}
                >
                  Upload .JSON file
                  <input
                    type='file'
                    hidden
                    name='json'
                    accept='application/json'
                    onChange={(e) => {
                      handleJsonCreate(e);
                    }}
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
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
      />
    </React.Fragment>
  );
}
