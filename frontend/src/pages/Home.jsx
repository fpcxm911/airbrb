import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavAirbrb from '../components/NavAirbrb';
import SearchBar from '../components/SearchBar';
import { Grid, Box } from '@mui/material';
import { apiCallGetAuthen, checkLogin } from './Helper';
import ErrorDialog from '../components/ErrorPopup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import ListingCard from '../components/ListingCard';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { calculateAverageRating } from '../pages/Helper';
import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';

const Home = () => {
  const [publishedListings, setpublishedListings] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  // const [sortOption, setSortOption] = React.useState('');
  const [sortOption, setSortOption] = React.useState('title');
  const navigate = useNavigate();

  const sortListings = async (listings) => {
    // have login
    if (checkLogin()) {
      const res = await apiCallGetAuthen('bookings', localStorage.getItem('token'));
      if (res.error) {
        setErrorMessage({ title: 'Error', body: res.error });
        setShowModal(true);
      } else {
        const accecptPendingBookings = res.bookings.filter(x => x.status === 'accepted' || x.status === 'pending');
        const extractedLitingsId = accecptPendingBookings.map(x => x.listingId);
        return listings.sort((a, b) => {
          const aIn = extractedLitingsId.includes(a.id);
          const bIn = extractedLitingsId.includes(b.id);
          if (aIn && !bIn) {
            return -1;
          } else if (!aIn && bIn) {
            return 1;
          } else if (aIn && bIn) {
            return 1;
          } else {
            return a.title.localeCompare(b.title);
          }
        });
      }
    } else {
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
  }, []);

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
      <Grid container justifyContent={'center'} sx={{ mt: 5, mb: 3 }}>
          <SearchBar update={setpublishedListings} />
      </Grid>
      <main>
      <Box sx={{ py: 8, mx: 10 }} >
        <Tooltip title={`Sort by ${sortOption}`} placement="top">
          <Button
            variant="contained"
            onClick={setNextOption}
            sx={{ mb: 2, borderRadius: 8 }}
            >
            Sort option &nbsp;
            { sortOption === optionList[0] && <AbcOutlinedIcon />}
            { sortOption === optionList[1] && <ArrowUpwardOutlinedIcon />}
            { sortOption === optionList[2] && <ArrowDownwardOutlinedIcon />}
          </Button>
        </Tooltip>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {publishedListings.map((listing, index) => (
              <Grid item key={listing.owner + index} xs={12} sm={6} md={4} >
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                  onClick={() => navigate(`/listing/${listing.id}`)}
                >
                  <ListingCard listing = {listing} />
                  <CardActions>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </main>
      {showModal && (<ErrorDialog close={() => setShowModal(false)} content={errorMessage} />)}
      <Outlet />
    </div>
  );
}

const optionList = ['title', 'ascending', 'descending'];

export default Home;
