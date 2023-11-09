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
  checkLogin,
} from './Helper';
import { useParams } from 'react-router-dom';
import BookingStatus from '../components/BookingStatus';

export default function ListingDetail () {
  const [listDeatail, setListDetail] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const params = useParams();

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
    const res = await apiCallGetAuthen(`listings/${params.id}`);
    if (res.error) {
      setErrorMessage({ title: 'Error', body: res.error });
      setShowModal(true);
    } else {
      const collectListingData = res.listing;
      collectListingData.id = params.id;
      console.log(collectListingData);
      setListDetail(collectListingData);
    }
  }, []);

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
              {checkLogin() && (
                <BookingStatus
                  setErrorMessage={setErrorMessage}
                  setShowModal={setShowModal}
                  listingId={listDeatail.id}
                />
              )}
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
