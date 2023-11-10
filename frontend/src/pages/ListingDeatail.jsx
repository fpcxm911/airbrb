import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import NavAirbrb from '../components/NavAirbrb';
import MyCarousels from '../components/MyCarousels';
import { Divider, Grid } from '@mui/material';
import Icon from '@mdi/react';
import {
  mdiWashingMachine,
  mdiMicrowave,
  mdiWifi,
  mdiHomeCircleOutline,
  mdiThumbsUpDown,
} from '@mdi/js';
import DisplayReview from '../components/DisplayReview';
import ErrorDialog from '../components/ErrorPopup';
import {
  apiCallGetAuthen,
  calculateNumBedrooms,
  calculateNumBeds,
} from './Helper';
import { useParams } from 'react-router-dom';
import BookingStatus from '../components/BookingStatus';
import ReviewForm from '../components/ReviewForm';
import { useContext, Context } from '../Context';

export default function ListingDetail () {
  const { getters, setters } = useContext(Context);
  const [listDeatail, setListDetail] = React.useState({});
  const [listBookings, setListBookings] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [newComment, setNewComment] = React.useState(0);

  const params = useParams();

  React.useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (email && token) {
      setters.setToken(token);
      setters.setEmail(email);
      setters.setLoggedIn(true);
    }
  }, []);

  const imageCollection = () => {
    const newArray = [listDeatail.thumbnail];
    newArray.push(...listDeatail.metadata.propertyImages);
    return newArray;
  };

  const addressCreate = () => {
    const address = listDeatail.address;
    return (
      address.postcode +
      ' ' +
      address.street +
      ', ' +
      address.city +
      ', ' +
      address.country
    );
  };

  const checkAmenities = (target) => {
    return listDeatail.metadata.amenities.includes(target);
  };

  React.useEffect(async () => {
    const listingRes = await apiCallGetAuthen(`listings/${params.id}`);
    if (listingRes.error) {
      setErrorMessage({ title: 'Error', body: listingRes.error });
      setShowModal(true);
    } else {
      const collectListingData = listingRes.listing;
      collectListingData.id = params.id;
      console.log(collectListingData);
      setListDetail(collectListingData);
    }
  }, [newComment]);

  React.useEffect(async () => {
    if (getters.loggedIn) {
      const bookingRes = await apiCallGetAuthen(
        'bookings',
        localStorage.getItem('token')
      );
      if (bookingRes.error) {
        setErrorMessage({ title: 'Error', body: bookingRes.error });
        setShowModal(true);
      } else {
        const myBookings = bookingRes.bookings.filter(
          (x) =>
            x.owner === localStorage.getItem('email') &&
            x.listingId === params.id
        );
        setListBookings(myBookings);
      }
    } else {
      setListBookings([]);
    }
  }, [getters.loggedIn]);

  return (
    <>
      {Object.keys(listDeatail).length > 0 && (
        <>
          <GlobalStyles
            styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
          />
          <CssBaseline />
          <NavAirbrb />
          {/* Hero unit */}
          <Container
            disableGutters
            maxWidth="md"
            component="main"
            sx={{ pt: 8, pb: 1 }}
          >
            <Typography
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {listDeatail.title}
            </Typography>
          </Container>
          {/* End hero unit */}
          <Container maxWidth="lg" component="main">
            <MyCarousels images={imageCollection(listDeatail)} />
            <Grid sx={{ mt: 5 }}>
              <Typography variant="h6" sx={{ pt: 3 }} color="text.primary">
                  Property details
                </Typography>
              <Grid container justifyContent={'space-between'} alignItems={'center'}>
                <Grid item sx={{ mt: 2, mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    gutterBottom
                  >
                    Type : {listDeatail.metadata.propertyType}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    gutterBottom
                  >
                    Address: {addressCreate()}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                  >
                    {calculateNumBeds(listDeatail)} beds |{' '}
                    {listDeatail.metadata.numberOfBathrooms} baths |{' '}
                    {calculateNumBedrooms(listDeatail)} bedrooms
                  </Typography>
                </Grid>
                <Typography variant="h5" color="text.primary">
                  ${listDeatail.price} AUD
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            {listDeatail.metadata.amenities.length
              ? (
              <Grid>
                <Typography variant="h6" sx={{ pt: 3 }} color="text.primary">
                  What this place offers
                </Typography>
                {checkAmenities('Wifi') && (
                  <Grid container alignItems={'center'} sx={{ pt: 3 }}>
                    <Icon path={mdiWifi} size={2} />
                    <Typography
                      variant="subtitle2"
                      sx={{ pl: 3 }}
                      color="text.secondary"
                    >
                      Wifi description
                    </Typography>
                  </Grid>
                )}
                {checkAmenities('Oven') && (
                  <Grid container alignItems={'center'} sx={{ pt: 3 }}>
                    <Icon path={mdiMicrowave} size={2} />
                    <Typography
                      variant="subtitle2"
                      sx={{ pl: 3 }}
                      color="text.secondary"
                    >
                      Oven description
                    </Typography>
                  </Grid>
                )}
                {checkAmenities('Wash Machine') && (
                  <Grid container alignItems={'center'} sx={{ pt: 3 }}>
                    <Icon path={mdiWashingMachine} size={2} />
                    <Typography
                      variant="subtitle2"
                      sx={{ pl: 3 }}
                      color="text.secondary"
                    >
                      Washing Machine description
                    </Typography>
                  </Grid>
                )}
              </Grid>
                )
              : (
              <Grid container alignItems={'center'} sx={{ pt: 3 }}>
                <Icon path={mdiHomeCircleOutline} size={2} />
                <Typography variant="h6" color="text.primary" sx={{ pl: 2 }}>
                  No amenities provided yet
                </Typography>
              </Grid>
                )}
            <Divider sx={{ my: 3 }} />
            {listDeatail.reviews.length
              ? (
              <DisplayReview listing={listDeatail} />
                )
              : (
              <Grid container alignItems={'center'}>
                <Icon path={mdiThumbsUpDown} size={2} />
                <Typography variant="h6" color="text.primary" sx={{ pl: 2 }}>
                  No rating and reviews yet
                </Typography>
              </Grid>
                )}
            {listBookings.length !== 0 && getters.loggedIn && <>
              <Divider />
            <Grid container direction='column' sx={{ my: 3 }} >
                <Typography variant="h6" sx={{ mb: 3 }} color="text.primary">
                  Leave your reviews
                </Typography>
              <Grid container direction='row' justifyContent='center' >
                <ReviewForm setErrorMessage = {setErrorMessage} setShowModal = {setShowModal} bookings={listBookings} listingId = {listDeatail.id} setNewComment={setNewComment} newComment={newComment}/>
              </Grid>
            </Grid>
            </>}
            {listBookings.length !== 0 && getters.loggedIn && (<>
              <Divider sx={{ mb: 3 }}/>
                <BookingStatus
                  setErrorMessage={setErrorMessage}
                  setShowModal={setShowModal}
                  bookings={listBookings}
                />
              </>
            )}
            <Copyright sx={{ my: 5 }} />
            {showModal && (
              <ErrorDialog
                close={() => setShowModal(false)}
                content={errorMessage}
              />
            )}
          </Container>
        </>
      )}
    </>
  );
}
