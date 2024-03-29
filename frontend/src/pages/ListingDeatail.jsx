import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import NavAirbrb from '../components/NavAirbrb';
import MyCarousels from '../components/MyCarousels';
import { Divider, Grid, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Icon from '@mdi/react';
import {
  mdiWashingMachine,
  mdiMicrowave,
  mdiWifi,
  mdiHomeCircleOutline,
  mdiThumbsUpDown,
  mdiPool,
  mdiAirConditioner,
} from '@mdi/js';
import DisplayReview from '../components/DisplayReview';
import {
  apiCallGetAuthen,
  calculateNumBedrooms,
  calculateNumBeds,
} from './Helper';
import { useParams } from 'react-router-dom';
import BookingStatus from '../components/BookingStatus';
import ReviewForm from '../components/ReviewForm';
import { useContext, Context } from '../Context';
import MakeBooking from './MakeBooking';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoListing from '../components/VideoListing';

export default function ListingDetail (props) {
  // get context states setter and getter
  const { getters, setters } = useContext(Context);
  // usestate to record current listing's detail
  const [listDeatail, setListDetail] = React.useState({});
  // usestate to record current listing's bookings
  const [listBookings, setListBookings] = React.useState([]);
  // usestate to indicate there is a new comment created
  const [newComment, setNewComment] = React.useState(0);
  // usestate to decide whether or not show make booking modal
  const [showMakeBooking, setShowMakeBooking] = React.useState(false);
  // usestate to indicate there is a booking update
  const [bookingUpdate, setBookingUpdate] = React.useState(0);

  // set booking update usestate
  const updateBookings = () => {
    setBookingUpdate(bookingUpdate + 1);
  };

  const params = useParams();

  // error display
  const toastError = (msg) => toast.error(msg);

  // fetch localstorage to context state prevent lossing data by refreshing
  React.useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (email && token) {
      setters.setToken(token);
      setters.setEmail(email);
      setters.setLoggedIn(true);
    }
  }, []);

  // collect all images for current listing
  const imageCollection = () => {
    const newArray = [listDeatail.thumbnail];
    newArray.push(...listDeatail.metadata.propertyImages);
    return newArray;
  };

  // create address
  const addressCreate = () => {
    const address = listDeatail.address;
    return (
      address.street +
      ', ' +
      address.city +
      ', ' +
      address.postcode +
      ', ' +
      address.country
    );
  };

  // check if current listing contains given amenity
  const checkAmenities = (target) => {
    return listDeatail.metadata.amenities.includes(target);
  };

  // booking succesful notification
  const bookingSuccessNotify = () =>
    toast.success(`Your booking made at ${listDeatail.title} is successful.`);

  // fetch listing detail once there is a new comment
  React.useEffect(async () => {
    const listingRes = await apiCallGetAuthen(`listings/${params.id}`);
    if (listingRes.error) {
      toastError(listingRes.error);
    } else {
      const collectListingData = listingRes.listing;
      collectListingData.id = params.id;
      setListDetail(collectListingData);
    }
  }, [newComment]);

  // set current listing's bookings once there is a booking update state change
  React.useEffect(async () => {
    if (getters.loggedIn) {
      const bookingRes = await apiCallGetAuthen(
        'bookings',
        localStorage.getItem('token')
      );
      if (bookingRes.error) {
        toastError(bookingRes.error);
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
  }, [getters.loggedIn, bookingUpdate]);

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
            maxWidth='md'
            component='main'
            sx={{ pt: 8, pb: 1 }}
          >
            <Typography
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom
            >
              {listDeatail.title}
            </Typography>
          </Container>
          {/* End hero unit */}
          <Container maxWidth='lg' component='main'>
            <MyCarousels images={imageCollection(listDeatail)} />
            <Grid sx={{ mt: 5 }}>
              <Typography variant='h6' sx={{ pt: 3 }} color='text.primary'>
                Property details
              </Typography>
              <Grid
                container
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Grid item sx={{ mt: 2, mb: 3 }}>
                  <Typography
                    variant='subtitle1'
                    color='text.secondary'
                    gutterBottom
                  >
                    Type : {listDeatail.metadata.propertyType}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    color='text.secondary'
                    gutterBottom
                  >
                    Address: {addressCreate()}
                  </Typography>
                  <Typography variant='subtitle1' color='text.secondary'>
                    {calculateNumBeds(listDeatail)} beds |{' '}
                    {listDeatail.metadata.numberOfBathrooms} baths |{' '}
                    {calculateNumBedrooms(listDeatail)} bedrooms
                  </Typography>
                </Grid>
                <Typography variant='h5' color='text.primary'>
                  {props.numberOfNights === null
                    ? `${listDeatail.price} AUD / NIGHT`
                    : `${listDeatail.price * props.numberOfNights} AUD / STAY`}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            {listDeatail.metadata.amenities.length
              ? (
              <Grid>
                <Typography variant='h6' sx={{ pt: 3 }} color='text.primary'>
                  What this place offers
                </Typography>
                {checkAmenities('Wifi') && (
                  <Grid container alignItems={'center'} sx={{ pt: 3 }}>
                    <Icon path={mdiWifi} size={2} />
                    <Typography
                      variant='subtitle2'
                      sx={{ pl: 3 }}
                      color='text.secondary'
                    >
                      Complimentary Wifi
                    </Typography>
                  </Grid>
                )}
                {checkAmenities('Oven') && (
                  <Grid container alignItems={'center'} sx={{ pt: 3 }}>
                    <Icon path={mdiMicrowave} size={2} />
                    <Typography
                      variant='subtitle2'
                      sx={{ pl: 3 }}
                      color='text.secondary'
                    >
                      Oven provided
                    </Typography>
                  </Grid>
                )}
                {checkAmenities('Wash Machine') && (
                  <Grid container alignItems={'center'} sx={{ pt: 3 }}>
                    <Icon path={mdiWashingMachine} size={2} />
                    <Typography
                      variant='subtitle2'
                      sx={{ pl: 3 }}
                      color='text.secondary'
                    >
                      Washing Machine provided
                    </Typography>
                  </Grid>
                )}
                {checkAmenities('Pool') && (
                  <Grid container alignItems={'center'} sx={{ pt: 3 }}>
                    <Icon path={mdiPool} size={2} />
                    <Typography
                      variant='subtitle2'
                      sx={{ pl: 3 }}
                      color='text.secondary'
                    >
                      Swimming Pool provided
                    </Typography>
                  </Grid>
                )}
                {checkAmenities('Air Conditioning') && (
                  <Grid container alignItems={'center'} sx={{ pt: 3 }}>
                    <Icon path={mdiAirConditioner} size={2} />
                    <Typography
                      variant='subtitle2'
                      sx={{ pl: 3 }}
                      color='text.secondary'
                    >
                      Air Conditioning
                    </Typography>
                  </Grid>
                )}
              </Grid>
                )
              : (
              <Grid container alignItems={'center'} sx={{ pt: 3 }}>
                <Icon path={mdiHomeCircleOutline} size={2} />
                <Typography variant='h6' color='text.primary' sx={{ pl: 2 }}>
                  No amenities provided yet
                </Typography>
              </Grid>
                )}
            <Divider sx={{ my: 3 }} />
            {listDeatail.metadata.youtubeUrl && (
              <>
                <VideoListing url={listDeatail.metadata.youtubeUrl} />
                <Divider sx={{ my: 3 }} />
              </>
            )}
            {listDeatail.reviews.length
              ? (
              <DisplayReview listing={listDeatail} />
                )
              : (
              <Grid container alignItems={'center'}>
                <Icon path={mdiThumbsUpDown} size={2} />
                <Typography
                  id='no-reviews-text'
                  variant='h6'
                  color='text.primary'
                  sx={{ pl: 2 }}
                >
                  No rating and reviews yet
                </Typography>
              </Grid>
                )}
            {listBookings.length !== 0 && getters.loggedIn && (
              <div id='leave-review'>
                <Divider sx={{ mt: 3 }} />
                <Grid container direction='column' sx={{ my: 3 }}>
                  <Typography variant='h6' sx={{ mb: 3 }} color='text.primary'>
                    Leave your reviews
                  </Typography>
                  <Grid container direction='row' justifyContent='center'>
                    <ReviewForm
                      toastError={toastError}
                      bookings={listBookings}
                      listingId={listDeatail.id}
                      setNewComment={setNewComment}
                      newComment={newComment}
                    />
                  </Grid>
                </Grid>
              </div>
            )}
            {getters.loggedIn && (
              <>
                <Divider sx={{ my: 3 }} />
                {listBookings.length !== 0 && getters.loggedIn && (
                  <Grid sx={{ mb: 3 }} id='booking-summary'>
                    <BookingStatus bookings={listBookings} />
                  </Grid>
                )}
                <Box textAlign={'center'}>
                  <Button
                    name='booking'
                    variant='contained'
                    sx={{ mb: 3, mx: 1.5 }}
                    onClick={() => setShowMakeBooking(true)}
                  >
                    Book this accomodation
                  </Button>
                  {showMakeBooking && (
                    <MakeBooking
                      setBookingUpdate={updateBookings}
                      price={String(listDeatail.price)}
                      listingid={Number(listDeatail.id)}
                      close={() => setShowMakeBooking(false)}
                      showBookSuccess={() => bookingSuccessNotify()}
                      listingDetail={listDeatail}
                    />
                  )}
                </Box>
              </>
            )}
            <Copyright sx={{ my: 5 }} />
            <ToastContainer
              position='top-center'
              autoClose={4000}
              hideProgressBar={false}
              closeOnClick
              pauseOnFocusLoss={false}
            />
          </Container>
        </>
      )}
    </>
  );
}
