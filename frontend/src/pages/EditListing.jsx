import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HomeBtn from '../components/HomeBtn';
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
import { apiCallGetAuthen } from './Helper';
import ErrorDialog from '../components/ErrorPopup';
import PropertyType from '../components/PropertyType';

export default function EditListing () {
  const params = useParams();
  const navigate = useNavigate();

  const [id, setId] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [listingData, setListingData] = React.useState({
    title: '',
    owner: '',
    address: { country: '', city: '', street: '', postcode: '' },
    price: '',
    thumbnail: '',
    metadata: { numberOfBathrooms: '', propertyType: '', amenities: [], bedrooms: [], youtubeUrl: '', propertyImages: [] },
    reviews: [],
    availability: [],
    published: false,
    postedOn: null,
  });

  React.useEffect(async () => {
    console.log(params.id);
    const listingRes = await apiCallGetAuthen(`listings/${params.id}`);
    if (listingRes.error) {
      setErrorMessage({ title: 'Error', body: listingRes.error });
      setShowModal(true);
      console.error(listingRes.error);
    } else {
      setListingData(listingRes.listing);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('submit');
  }

  console.log('listing data');
  console.log(listingData);

  if (!params.id) {
    return (
      <>
        Listing id: <input value={id} onChange={(e) => setId(e.target.value)} />
        <button onClick={() => navigate(`/edit/${id}`)}>
          Go!
        </button>
        <HomeBtn />
      </>
    );
  }

  return (
    <>
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
        <HomeBtn />
        <Avatar sx={{ m: 1, bgcolor: '#00a3fa' }}>
          <MapsHomeWorkIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Edit your Hosted Listing id {params.id}
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                  setListingData({ ...listingData, address: { ...listingData.address, country: e.target.value } });
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
                  setListingData({ ...listingData, address: { ...listingData.address, city: e.target.value } });
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
                  setListingData({ ...listingData, address: { ...listingData.address, street: e.target.value } });
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
                  setListingData({ ...listingData, address: { ...listingData.address, postcode: e.target.value } });
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
                  setListingData({ ...listingData, metadata: { ...listingData.metadata, numberOfBathrooms: e.target.value } });
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
                startIcon={<ImageIcon />}
              >
                Upload Property Images
                <input
                  type='file'
                  hidden
                  name='photo'
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
            fullWidth
            variant='contained'
            sx={{ mt: 5, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
      {showModal && <ErrorDialog content={errorMessage} close={setShowModal} />}
    </>
  );
}
