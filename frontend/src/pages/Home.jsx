import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavAirbrb from '../components/NavAirbrb';
import SearchBar from '../components/SearchBar';
import { Grid, Box } from '@mui/material';
import { apiCallGetAuthen } from './Helper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import ListingCard from '../components/ListingCard';
import { useContext, Context } from '../Context';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { calculateAverageRating } from '../pages/Helper';
import Icon from '@mdi/react';
import {
  mdiSortAlphabeticalAscending,
  mdiSortNumericAscending,
  mdiSortNumericDescending,
} from '@mdi/js';
import NoResult from '../components/NoResult';
import Spinner from '../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';

const Home = (props) => {
  const { getters, setters } = useContext(Context);
  const [publishedListings, setpublishedListings] = React.useState([]);
  const [sortOption, setSortOption] = React.useState('title');
  const [reset, setReset] = React.useState(0);
  const [noResult, setNoResult] = React.useState(false);
  const [spinner, setSpinner] = React.useState(false);

  const toastError = (msg) => {
    toast.error(msg);
  };

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
  };
  const sortListings = async (listings) => {
    // have login
    if (getters.loggedIn) {
      const res = await apiCallGetAuthen(
        'bookings',
        localStorage.getItem('token')
      );
      if (res.error) {
        toastError(res.error);
      } else {
        const accecptPendingBookings = res.bookings.filter(
          (x) =>
            (x.status === 'accepted' || x.status === 'pending') &&
            x.owner === localStorage.getItem('email')
        );
        const extractedLitingsId = accecptPendingBookings.map(
          (x) => x.listingId
        );
        return listings.sort((a, b) => {
          const aIn = extractedLitingsId.includes(String(a.id));
          const bIn = extractedLitingsId.includes(String(b.id));
          if (aIn && !bIn) {
            return -1;
          } else if (!aIn && bIn) {
            return 1;
          } else if (aIn && bIn) {
            return a.title.localeCompare(b.title);
          } else {
            return a.title.localeCompare(b.title);
          }
        });
      }
    } else {
      return listings.sort((a, b) => a.title.localeCompare(b.title));
    }
  };

  // first load of home page
  React.useEffect(async () => {
    const res = await apiCallGetAuthen('listings');
    if (res.error) {
      toastError(res.error);
    } else {
      const myListingsDetail = [];
      for (const listing of res.listings) {
        const deatailRes = await apiCallGetAuthen(`listings/${listing.id}`);
        if (deatailRes.error) {
          toastError(deatailRes.error);
        } else {
          const collectListingData = deatailRes.listing;
          collectListingData.id = listing.id;
          myListingsDetail.push(collectListingData);
        }
      }
      const newList = await sortListings(
        myListingsDetail.filter((x) => x.published)
      );
      setpublishedListings(newList);
    }
  }, [getters.loggedIn, reset]);

  // sort if sortOption changes
  React.useEffect(async () => {
    let myListingsDetail;
    const unsortedListings = [...publishedListings];
    switch (sortOption) {
      case 'ascending':
        unsortedListings.forEach((listing) => {
          listing.averageRating = isNaN(calculateAverageRating(listing))
            ? 999
            : calculateAverageRating(listing);
        });
        unsortedListings.sort((a, b) => a.averageRating - b.averageRating);
        setpublishedListings(unsortedListings);
        break;
      case 'descending':
        unsortedListings.forEach((listing) => {
          listing.averageRating = isNaN(calculateAverageRating(listing))
            ? -1
            : calculateAverageRating(listing);
        });
        unsortedListings.sort((a, b) => b.averageRating - a.averageRating);
        setpublishedListings(unsortedListings);
        break;
      default:
        myListingsDetail = [];
        for (const listing of unsortedListings) {
          const deatailRes = await apiCallGetAuthen(`listings/${listing.id}`);
          if (deatailRes.error) {
            toastError(deatailRes.error);
          } else {
            const collectListingData = deatailRes.listing;
            collectListingData.id = listing.id;
            myListingsDetail.push(collectListingData);
          }
        }
        setpublishedListings(
          await sortListings(myListingsDetail.filter((x) => x.published))
        );
        break;
    }
  }, [sortOption]);

  // set up loading spinner and no result notice
  React.useEffect(() => {
    setSpinner(false);
    setNoResult(false);
    if (publishedListings.length > 0) {
      setSpinner(false);
      setNoResult(false);
      return;
    }
    setSpinner(true);
    setNoResult(false);
    const timeout = setTimeout(() => {
      if (publishedListings.length === 0) {
        setSpinner(false);
        setNoResult(true);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [publishedListings]);

  const setNextOption = () => {
    const curIndex = optionList.indexOf(sortOption);
    const nextIndex = (curIndex + 1) % optionList.length;
    setSortOption(optionList[nextIndex]);
  };

  return (
    <div>
      <NavAirbrb />
      <Grid container justifyContent={'center'} sx={{ mt: 4, mb: 3 }}>
        <SearchBar
          update={setpublishedListings}
          setNumberOfNights={props.setNumberOfNights}
        />
      </Grid>
      <main>
        <Box sx={{ py: 3, mx: { xs: 4, md: 10 } }}>
          <Tooltip title={`Sort by: ${sortOption}`} placement='top'>
            <Button
              variant='contained'
              onClick={setNextOption}
              sx={{ mb: 2, borderRadius: 8, mr: 2 }}
            >
              Sorting by &nbsp;
              {sortOption === optionList[0] && (
                <Icon path={mdiSortAlphabeticalAscending} size={1} />
              )}
              {sortOption === optionList[1] && (
                <Icon path={mdiSortNumericAscending} size={1} />
              )}
              {sortOption === optionList[2] && (
                <Icon path={mdiSortNumericDescending} size={1} />
              )}
            </Button>
          </Tooltip>
          <Button
            variant='contained'
            onClick={handleReset}
            sx={{ mb: 2, borderRadius: 8 }}
          >
            Reset
          </Button>
          {spinner && <Spinner />}
          <Grid container spacing={4}>
            {publishedListings.map((listing, index) => (
              <Grid item key={listing.owner + index} xs={12} sm={6} md={4}>
                <Card
                  id={`listing${index}`}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/listing/${listing.id}`)}
                >
                  <ListingCard
                    listing={listing}
                    hotedPage={false}
                    index={index}
                  />
                  <CardActions></CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          {noResult && <NoResult />}
        </Box>
      </main>
      <ToastContainer
        position='top-center'
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss={false}
      />
      <Outlet />
    </div>
  );
};

const optionList = ['title', 'ascending', 'descending'];

export default Home;
