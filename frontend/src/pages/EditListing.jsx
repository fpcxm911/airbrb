import * as React from 'react';
import {
  useParams,
  useNavigate
} from 'react-router-dom';
import HomeBtn from '../components/HomeBtn';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
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
import DialogContentText from '@mui/material/DialogContentText';
import { apiCallGetAuthen } from './Helper';
import ErrorDialog from '../components/ErrorPopup';

export default function EditListing () {
  console.log('edit listing page loading');
  const params = useParams();
  const navigate = useNavigate();

  const [id, setId] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [listingData, setListingData] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);

  console.log(setErrorMessage);

  if (!params.id) {
    return (
        <>
        Listing id: <input value={id} onChange={e => setId(e.target.value)} />
        <button onClick={() => {
          navigate(`/edit/${id}`);
        }}>Go!</button>
        <HomeBtn />
        </>
    );
  }

  React.useEffect(async () => {
    const listingRes = await apiCallGetAuthen(`listings/${params.id}`);
    if (listingRes.error) {
      setErrorMessage({ title: 'Error', body: listingRes.error });
      setShowModal(true);
    } else {
      setListingData(listingRes);
    }
  }, [params.id]);

  console.log('listing data');
  console.log(listingData);

  return (
    <>
        <DialogContent dividers sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          ml: 1.5,
          mr: 1.5,
        }}>
          <HomeBtn />
          <Avatar sx={{ m: 1, bgcolor: '#00a3fa' }}>
            <MapsHomeWorkIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Edit your Hosted Listing id {params.id}
          </Typography>
          <Box component='form' onSubmit={() => console.log('hi')} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='listing-edit-title'
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
                  Upload Photo
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
        {showModal && <ErrorDialog content={errorMessage} close={setShowModal} />}
    </>
  );
}
