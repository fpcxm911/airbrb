import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import { apiCallGetAuthen, apiCallBodyAuthen } from './Helper';
import ErrorDialog from '../components/ErrorPopup';
import ListCreate from './ListCreate';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import ListPublish from './ListPublish';

// TODO remove, this demo shouldn't need to reset the theme.

export default function HostedListing () {
  const [HostedLists, setHostedLists] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showCreate, setShowCreate] = React.useState(false);
  const [showPublish, setShowPublish] = React.useState([false, '']);
  const [listingsUpdate, setListingsUpdate] = React.useState(0);
  const navigate = useNavigate();

  const goBackMain = () => {
    navigate('/');
  };
  const closeCreate = () => {
    setShowCreate(false);
  };

  const closePublish = () => {
    setShowPublish(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const updateListing = () => {
    setListingsUpdate(listingsUpdate + 1)
  };

  const convertPrecision = (number) => {
    return Math.round(number * 10) / 10;
  };

  const calculateAverageRating = (listing) => {
    const sum = listing.reviews.reduce((accumulator, review) => accumulator + review.rating, 0);
    return convertPrecision(sum / listing.reviews.length)
  };

  const calculateNumBeds = (listing) => {
    return (listing.metadata.bedrooms.reduce((accumulator, bedroom) => accumulator + Number(bedroom.numberOfBeds), 0));
  };

  const deleteListing = async (listing) => {
    const res = await apiCallBodyAuthen(`listings/${listing.id}`, localStorage.getItem('token'), {}, 'DELETE');
    if (res.error) {
      console.log(listing.id);
      setErrorMessage({ title: 'Error', body: res.error });
      setShowModal(true);
    } else {
      const newListings = HostedLists.filter(x => x.id !== listing.id)
      setHostedLists(newListings)
    }
  };

  const unpublishListing = async (listing) => {
    const res = await apiCallBodyAuthen(`listings/unpublish/${listing.id}`, localStorage.getItem('token'), {}, 'PUT');
    if (res.error) {
      console.log(listing.id);
      setErrorMessage({ title: 'Error', body: res.error });
      setShowModal(true);
    } else {
      const newListings = HostedLists.map(item => {
        if (item.id === listing.id) {
          return { ...item, published: false }
        }
        return item;
      });
      setHostedLists(newListings);
    }
  }

  React.useEffect(async () => {
    const res = await apiCallGetAuthen('listings',);
    if (res.error) {
      setErrorMessage({ title: 'Error', body: res.error });
      setShowModal(true);
    } else {
      const currentUserEmail = localStorage.getItem('email');

      const myListings = res.listings.filter(x => x.owner === currentUserEmail)
      const myListingsDetail = []
      for (const listing of myListings) {
        const deatailRes = await apiCallGetAuthen(`listings/${listing.id}`);
        if (deatailRes.error) {
          setErrorMessage({ title: 'Error', body: res.error });
          setShowModal(true);
        } else {
          const collectListingData = deatailRes.listing;
          collectListingData.id = listing.id
          myListingsDetail.push(collectListingData)
        }
      }
      setHostedLists(myListingsDetail)
    }
  }, [listingsUpdate]);
  return (
    <div>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Your Hosted listings
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              View, create and edit your hosted listing
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Airbrb provide you powerful listing management functionalities
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={() => setShowCreate(true)}>Create new listing</Button>
              <Button variant="outlined" onClick={goBackMain}>Go back</Button>
            </Stack>
          </Container>
        </Box>
        <Box sx={{ py: 8, mx: 10 }} >
          {/* End hero unit */}
          <Grid container spacing={4}>
            {HostedLists.map((listing, index) => (
              <Grid item key={listing.owner + index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={listing.thumbnail}
                  />
                  <CardContent sx={{ flexGrow: 1, ml: 1 }} >
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }} >
                        {listing.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" gutterBottom >
                      Property type : {listing.metadata.propertyType}
                    </Typography>
                    <Typography variant="body2" gutterBottom >
                      Number of bathrooms : {listing.metadata.numberOfBathrooms}
                    </Typography>

                    <Typography variant="body2" gutterBottom >
                      Number of beds : {calculateNumBeds(listing)}
                    </Typography>

                    <Box sx={{ mt: 3, height: '80px' }}>
                      {listing.reviews.length === 0
                        ? <Box sx={{ pt: 3 }}>
                            <Typography variant="body2" gutterBottom >
                              No reviews yet
                            </Typography>
                          </Box>
                        : <>
                          <Box sx={{ display: 'flex' }}>
                            <Rating
                              value={calculateAverageRating(listing)}
                              readOnly
                              precision={0.1}
                              emptyIcon={<StarIcon style={{ opacity: 0.55 }}
                              sx={{ mb: 1 }}
                              fontSize="inherit" />} />
                            <Typography variant="body2" sx={{ ml: 2 }}>{calculateAverageRating(listing)}</Typography>
                          </Box>
                          <Typography variant="body2" gutterBottom >
                            Number of reviews : {listing.reviews.length}
                          </Typography>
                        </>
                      }
                    </Box>
                    <Typography variant="button" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Price : {listing.price} AUD / NIGHT
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => navigate(`/edit/${listing.id}`)}>EDIT</Button>
                    {!listing.published && <Button size="small" onClick={() => setShowPublish([true, listing.id])}>PUBLISH</Button>}
                    {listing.published && <Button size="small" onClick={() => unpublishListing(listing)}>UNPUBLISH</Button>}
                    <Button size="small" onClick={() => deleteListing(listing)}>DELETE</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        {/* <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography> */}
        <Copyright />
      </Box>
      {/* End footer */}
      {showModal && (<ErrorDialog close={closeModal} content={errorMessage} />)}
      {showCreate && (<ListCreate close={closeCreate} update={updateListing} />)}
      {showPublish[1] && (<ListPublish close={closePublish} update={updateListing} listingid={showPublish[1]} />)}
    </div>
  );
}
