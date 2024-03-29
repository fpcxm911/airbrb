import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PropertyAmenities from '../components/PropertyAmenities';
import PropertyBedroom from '../components/PropertyBedroom';
import ImageIcon from '@mui/icons-material/Image';
import DialogContentText from '@mui/material/DialogContentText';
import {
  apiCallBodyAuthen,
  apiCallGetAuthen,
  createAddress,
  fileToDataUrl,
  createMeta,
} from './Helper';
import { ToastContainer, toast } from 'react-toastify';
import PropertyType from '../components/PropertyType';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const EditListing = (props) => {
  const [openEditing, setOpenEditing] = React.useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = React.useState('');
  const [listingData, setListingData] = React.useState({
    title: '',
    owner: '',
    address: { country: '', city: '', street: '', postcode: '' },
    price: '',
    thumbnail: '',
    metadata: {
      numberOfBathrooms: '',
      propertyType: '',
      amenities: [],
      bedrooms: [],
      youtubeUrl: '',
      propertyImages: [],
    },
    reviews: [],
    availability: [],
    published: false,
    postedOn: null,
  });

  const toastError = (msg) => {
    toast.error(msg);
  };

  React.useEffect(async () => {
    const listingRes = await apiCallGetAuthen(`listings/${params.id}`);
    if (listingRes.error) {
      toastError(listingRes.error);
      console.error(listingRes.error);
    } else {
      setListingData(listingRes.listing);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (JSON.parse(data.get('bedrooms')).length > 0) {
      try {
        let thumbnail;
        data.get('thumbnail') && data.get('thumbnail').name
          ? (thumbnail = await fileToDataUrl(data.get('thumbnail')))
          : (thumbnail = listingData.thumbnail);
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
        const images = data.getAll('images');
        for (const image of images) {
          image.name && propertyImages.push(await fileToDataUrl(image));
        }
        const metadata = createMeta(
          bathNum,
          propertyType,
          bedroomsArray,
          amenitiesList,
          youtubeUrl,
          propertyImages
        );
        const res = await apiCallBodyAuthen(
          `listings/${params.id}`,
          token,
          {
            title,
            address,
            thumbnail,
            price,
            metadata,
          },
          'PUT'
        );
        if (res.error) {
          setErrorMessage(res.error);
        } else {
          props.update();
          navigate('/hosted');
        }
      } catch (error) {
        setErrorMessage(error);
      }
    } else {
      setErrorMessage('Please add at least one bedroom');
    }
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={() => {
          setOpenEditing(false);
          navigate('/hosted');
        }}
        open={openEditing}
        PaperProps={{ sx: { borderRadius: 6 } }}
      >
        <IconButton
          aria-label='close'
          onClick={() => {
            setOpenEditing(false);
            navigate('/hosted');
          }}
          size='small'
          sx={{
            position: 'absolute',
            right: 7,
            top: 7,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Grid container justify='flex-end' alignItems={'flex-end'}></Grid>
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
            Edit your Listing
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
                  id='title'
                  label='Title'
                  name='title'
                  autoComplete='title'
                  value={listingData.title}
                  onChange={(e) => {
                    setListingData({ ...listingData, title: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label='Country'
                  name='country'
                  autoComplete='country'
                  value={listingData.address.country}
                  onChange={(e) => {
                    setListingData({
                      ...listingData,
                      address: {
                        ...listingData.address,
                        country: e.target.value,
                      },
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label='City'
                  name='city'
                  autoComplete='city'
                  value={listingData.address.city}
                  onChange={(e) => {
                    setListingData({
                      ...listingData,
                      address: { ...listingData.address, city: e.target.value },
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label='Street'
                  name='street'
                  autoComplete='street'
                  value={listingData.address.street}
                  onChange={(e) => {
                    setListingData({
                      ...listingData,
                      address: {
                        ...listingData.address,
                        street: e.target.value,
                      },
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label='Postcode'
                  name='postcode'
                  autoComplete='postcode'
                  value={listingData.address.postcode}
                  onChange={(e) => {
                    setListingData({
                      ...listingData,
                      address: {
                        ...listingData.address,
                        postcode: e.target.value,
                      },
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  type='number'
                  name='bath'
                  label='Bathrooms'
                  value={listingData.metadata.numberOfBathrooms}
                  onChange={(e) => {
                    setListingData({
                      ...listingData,
                      metadata: {
                        ...listingData.metadata,
                        numberOfBathrooms: e.target.value,
                      },
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type='number'
                  name='price'
                  label='Price/Night'
                  required
                  value={listingData.price}
                  onChange={(e) => {
                    setListingData({ ...listingData, price: e.target.value });
                  }}
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
                  label='Youtube URL (Optional)'
                  value={listingData.metadata.youtubeUrl}
                  onChange={(e) => {
                    setListingData({
                      ...listingData,
                      metadata: {
                        ...listingData.metadata,
                        youtubeUrl: e.target.value,
                      },
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant='text'
                  component='label'
                  startIcon={<ImageIcon />}
                >
                  update Thumbnail
                  <input
                    type='file'
                    hidden
                    name='thumbnail'
                    accept='image/jpeg, image/jpg, image/png'
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant='text'
                  component='label'
                  startIcon={<ImageIcon />}
                >
                  Upload Property Images
                  <input
                    type='file'
                    hidden
                    name='images'
                    multiple
                    accept='image/jpeg, image/jpg, image/png'
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <DialogContentText
                  color='error'
                  sx={{ textAlign: 'center' }}
                  xs={12}
                >
                  {errorMessage}
                </DialogContentText>
              </Grid>
            </Grid>
            <Button
              type='submit'
              name='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 5, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </DialogContent>
        <ToastContainer
          position='top-center'
          autoClose={4000}
          hideProgressBar={false}
          closeOnClick
        />
      </Dialog>
    </React.Fragment>
  );
};

export default EditListing;
