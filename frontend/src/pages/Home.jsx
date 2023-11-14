import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavAirbrb from '../components/NavAirbrb';
import SearchBar from '../components/SearchBar';
import { Grid, Box, Typography } from '@mui/material';
import { apiCallGetAuthen } from './Helper';
import ErrorDialog from '../components/ErrorPopup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import ListingCard from '../components/ListingCard';
import { useContext, Context } from '../Context';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { calculateAverageRating } from '../pages/Helper';
import Icon from '@mdi/react';
import { mdiSortAlphabeticalAscending, mdiSortNumericAscending, mdiSortNumericDescending, mdiExclamationThick } from '@mdi/js';

const Home = (props) => {
  const { getters, setters } = useContext(Context);
  const [publishedListings, setpublishedListings] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [sortOption, setSortOption] = React.useState('title');
  const [reset, setReset] = React.useState(0);
  const navigate = useNavigate();
  // fetch localstorage to context state prevent lossing data by refreshing
  React.useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (email && token) {
      setters.setToken(token);
      setters.setEmail(email);
      setters.setLoggedIn(true);
    }
    props.setNumberOfNights(null);
  }, [reset]);
  const handleReset = () => {
    setSortOption('title');
    setReset(reset + 1);
  }
  const sortListings = async (listings) => {
    // have login
    if (getters.loggedIn) {
      const res = await apiCallGetAuthen('bookings', localStorage.getItem('token'));
      if (res.error) {
        setErrorMessage({ title: 'Error', body: res.error });
        setShowModal(true);
      } else {
        const accecptPendingBookings = res.bookings.filter(x => (x.status === 'accepted' || x.status === 'pending') && x.owner === localStorage.getItem('email'));
        const extractedLitingsId = accecptPendingBookings.map(x => x.listingId);
        console.log(extractedLitingsId);
        return listings.sort((a, b) => {
          const aIn = extractedLitingsId.includes(String(a.id));
          const bIn = extractedLitingsId.includes(String(b.id));
          if (aIn && !bIn) {
            console.log('123');
            return -1;
          } else if (!aIn && bIn) {
            console.log('456');
            return 1;
          } else if (aIn && bIn) {
            console.log('789');
            return a.title.localeCompare(b.title);
          } else {
            console.log('haha');
            return a.title.localeCompare(b.title);
          }
        });
      }
    } else {
      console.log('noway');
      return listings.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  // first load of home page
  React.useEffect(async () => {
    const res = await apiCallGetAuthen('listings');
    if (res.error) {
      setErrorMessage({ title: 'Error', body: res.error });
      setShowModal(true);
    } else {
      const myListingsDetail = []
      for (const listing of res.listings) {
        const deatailRes = await apiCallGetAuthen(`listings/${listing.id}`);
        if (deatailRes.error) {
          setErrorMessage({ title: 'Error', body: deatailRes.error });
          setShowModal(true);
        } else {
          const collectListingData = deatailRes.listing;
          collectListingData.id = listing.id
          myListingsDetail.push(collectListingData)
        }
      }
      const newList = await sortListings(myListingsDetail.filter(x => x.published));
      setpublishedListings(newList);
    }
  }, [getters.loggedIn, reset]);
  console.log('rendering again');

  // sort if sortOption changes
  React.useEffect(async () => {
    let myListingsDetail;
    const unsortedListings = [...publishedListings];
    switch (sortOption) {
      case 'ascending':
        unsortedListings.forEach((listing) => {
          listing.averageRating = isNaN(calculateAverageRating(listing)) ? 999 : calculateAverageRating(listing);
        });
        unsortedListings.sort((a, b) => a.averageRating - b.averageRating);
        setpublishedListings(unsortedListings);
        break;
      case 'descending':
        unsortedListings.forEach((listing) => {
          listing.averageRating = isNaN(calculateAverageRating(listing)) ? -1 : calculateAverageRating(listing);
        });
        unsortedListings.sort((a, b) => b.averageRating - a.averageRating);
        setpublishedListings(unsortedListings);
        break;
      default:
        myListingsDetail = [];
        for (const listing of unsortedListings) {
          const deatailRes = await apiCallGetAuthen(`listings/${listing.id}`);
          if (deatailRes.error) {
            setErrorMessage({ title: 'Error', body: deatailRes.error });
            setShowModal(true);
          } else {
            const collectListingData = deatailRes.listing;
            collectListingData.id = listing.id;
            myListingsDetail.push(collectListingData);
          }
        }
        setpublishedListings(await sortListings(myListingsDetail.filter(x => x.published)));
        break;
    }
  }, [sortOption]);

  const setNextOption = () => {
    const curIndex = optionList.indexOf(sortOption);
    const nextIndex = (curIndex + 1) % optionList.length;
    setSortOption(optionList[nextIndex]);
  }

  return (
    <div>
      <NavAirbrb/>
      <Grid container justifyContent={'center'} sx={{ mt: 4, mb: 3 }}>
          <SearchBar update={setpublishedListings} setNumberOfNights={props.setNumberOfNights}/>
      </Grid>
      <main>
      <Box sx={{ py: 3, mx: { xs: 4, md: 10 } }} >
        <Tooltip title={`Sort by: ${sortOption}`} placement="top">
          <Button
            variant="contained"
            onClick={setNextOption}
            sx={{ mb: 2, borderRadius: 8 }}
            >
            Sort option &nbsp;
            { sortOption === optionList[0] && <Icon path={mdiSortAlphabeticalAscending} size={1} />}
            { sortOption === optionList[1] && <Icon path={mdiSortNumericAscending} size={1} />}
            { sortOption === optionList[2] && <Icon path={mdiSortNumericDescending} size={1} />}
          </Button>
        </Tooltip>
        <Button
            variant="contained"
            onClick={handleReset}
            sx={{ mb: 2, borderRadius: 8, ml: 2 }}
            >
            Reset &nbsp;
          </Button>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {publishedListings.map((listing, index) => (
              <Grid item key={listing.owner + index} xs={12} sm={6} md={4} >
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                  onClick={() => navigate(`/listing/${listing.id}`)}
                >
                  <ListingCard listing = {listing} hotedPage = {false} />
                  <CardActions>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          {publishedListings.length === 0 && (
              <Grid container spacing={4} justifyContent={'flex-end'} alignItems={'center'} sx={{ mt: 3 }}>
                <Grid item xs={2}>
                  <Icon path={mdiExclamationThick} size={'auto'} />
                </Grid>
                <Grid item xs={8}>
                  <Typography component="h4" variant="h4" gutterBottom>
                    Sorry, we could not find any listing
                  </Typography>
                </Grid>
              </Grid>
          )}
        </Box>
      </main>
      {showModal && (<ErrorDialog close={() => setShowModal(false)} content={errorMessage} />)}
      <Outlet />
    </div>
  );
}

const optionList = ['title', 'ascending', 'descending'];

export default Home;
