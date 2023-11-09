import React from 'react';
// import navAirbrb from '../components/navAirbrb';
import { Outlet, useNavigate } from 'react-router-dom';
import NavAirbrb from '../components/NavAirbrb';
import SearchBar from '../components/SearchBar';
import { Grid, Box } from '@mui/material';
import { apiCallGetAuthen } from './Helper';
import ErrorDialog from '../components/ErrorPopup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import ListingCard from '../components/ListingCard';
import { useContext, Context } from '../Context';
// import Button from '@mui/material/Button';
export default function Home () {
  const { getters, setters } = useContext(Context);
  const [publishedListings, setpublishedListings] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
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
  }, []);

  const sortListings = async (listings) => {
    // have login
    if (getters.loggedIn) {
      const res = await apiCallGetAuthen('bookings', localStorage.getItem('token'));
      if (res.error) {
        setErrorMessage({ title: 'Error', body: res.error });
        setShowModal(true);
      } else {
        const accecptPendingBookings = res.bookings.filter(x => x.status === 'accepted' || x.status === 'pending');
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
            return 1;
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
          setErrorMessage({ title: 'Error', body: res.error });
          setShowModal(true);
        } else {
          const collectListingData = deatailRes.listing;
          collectListingData.id = listing.id;
          myListingsDetail.push(collectListingData);
        }
      }
      const newList = await sortListings(myListingsDetail.filter(x => x.published));
      setpublishedListings(newList);
    }
  }, [getters.loggedIn]);
  // const navigate = useNavigate();
  console.log('rendering again');
  return (
    <div>
      <NavAirbrb/>
      <Grid container justifyContent={'center'} sx={{ mt: 5, mb: 3 }}>
        <SearchBar update={setpublishedListings} />
      </Grid>
      <main>
      <Box sx={{ py: 8, mx: 10 }} >
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
