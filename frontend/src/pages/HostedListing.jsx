import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import { apiCallGetAuthen, apiCallBodyAuthen } from './Helper';
import Listcreate from './Listcreate';
import { useNavigate, Outlet } from 'react-router-dom';
import ListPublish from './ListPublish';
import NavAirbrb from '../components/NavAirbrb';
import ListingCard from '../components/ListingCard';
import { useContext, Context } from '../Context';
import ProfitChart from '../components/ProfitChart';
import NoPermission from './NoPermission';
import { ToastContainer, toast } from 'react-toastify';

const buttonFontSize = 12;
export default function HostedListing (props) {
  // get context states setter and getter
  const { getters, setters } = useContext(Context);
  // usestate to record current user's hosted listing
  const [HostedLists, setHostedLists] = React.useState([]);
  // usestate to decide whether should open listing create modal
  const [showCreate, setShowCreate] = React.useState(false);
  // usestate to decide whether should open listing publish modal
  const [showPublish, setShowPublish] = React.useState([false, '']);

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

  const navigate = useNavigate();

  // error display
  const toastError = (msg) => toast.error(msg);

  // navigate to home page
  const goBackMain = () => {
    navigate('/');
  };

  // close listing create modal
  const closeCreate = () => {
    setShowCreate(false);
  };

  // close listing publish modal
  const closePublish = () => {
    setShowPublish(false);
  };

  // delete a hosted listing
  const deleteListing = async (listing) => {
    const res = await apiCallBodyAuthen(
      `listings/${listing.id}`,
      localStorage.getItem('token'),
      {},
      'DELETE'
    );
    if (res.error) {
      toastError(res.error);
    } else {
      // update on the page by filter the element with deleted listing Id
      const newListings = HostedLists.filter((x) => x.id !== listing.id);
      // update hosted listing usestate
      setHostedLists(newListings);
    }
  };

  // unpublish a hosted listing
  const unpublishListing = async (listing) => {
    const res = await apiCallBodyAuthen(
      `listings/unpublish/${listing.id}`,
      localStorage.getItem('token'),
      {},
      'PUT'
    );
    if (res.error) {
      toastError(res.error);
    } else {
      const newListings = HostedLists.map((item) => {
        if (item.id === listing.id) {
          return { ...item, published: false };
        }
        return item;
      });
      setHostedLists(newListings);
    }
  };

  // fetech listings once there is a update indicator
  React.useEffect(async () => {
    const res = await apiCallGetAuthen('listings');
    if (res.error) {
      toastError(res.error);
    } else {
      const currentUserEmail = localStorage.getItem('email');

      const myListings = res.listings.filter(
        (x) => x.owner === currentUserEmail
      );
      const myListingsDetail = [];
      for (const listing of myListings) {
        const deatailRes = await apiCallGetAuthen(`listings/${listing.id}`);
        if (deatailRes.error) {
          toastError(deatailRes.error);
        } else {
          const collectListingData = deatailRes.listing;
          collectListingData.id = listing.id;
          myListingsDetail.push(collectListingData);
        }
      }
      setHostedLists(myListingsDetail);
    }
  }, [props.listingsUpdate]);

  return (
    <>
      {getters.loggedIn
        ? (
        <div>
          <CssBaseline />
          <NavAirbrb />
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
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Airbrb provide you powerful listing management functionalities
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    name='create-list'
                    onClick={() => setShowCreate(true)}
                  >
                    Create new listing
                  </Button>
                  <Button variant="outlined" onClick={goBackMain}>
                    Return to main page
                  </Button>
                </Stack>
              </Container>
            </Box>
            <Box sx={{ py: 8, mx: { xs: 4, md: 10 } }}>
              {/* End hero unit */}
              <Box sx={{ mb: 5 }}>
                <Typography variant="h5" color="text.primary" paragraph>
                  Your last 30 days profits
                </Typography>
                <ProfitChart myListings={HostedLists} toastError={toastError}/>
              </Box>
              <Grid container spacing={4}>
                {HostedLists.map((listing, index) => (
                  <Grid item id={`hosted${index}`} key={listing.owner + index} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <ListingCard listing={listing} hotedPage={true} index={index} />
                      <CardActions
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                        }}>
                        <Button
                          size="small"
                          name={`edit-list${index}`}
                          sx={{ fontSize: buttonFontSize }}
                          onClick={() => navigate(`/hosted/edit/${listing.id}`)}
                        >
                          EDIT
                        </Button>
                        <Button
                          size="small"
                          name={`booking-list${index}`}
                          sx={{ fontSize: buttonFontSize }}
                          onClick={() =>
                            navigate(`/hosted/booking/${listing.id}`)
                          }
                        >
                          BOOKINGS
                        </Button>
                        {!listing.published && (
                          <Button
                            size="small"
                            name={`set-publish${index}`}
                            sx={{ fontSize: buttonFontSize }}
                            onClick={() => setShowPublish([true, listing.id])}
                          >
                            PUBLISH
                          </Button>
                        )}
                        {listing.published && (
                          <Button
                            size="small"
                            name={`set-unpublish${index}`}
                            sx={{ fontSize: buttonFontSize }}
                            onClick={() => unpublishListing(listing)}
                          >
                            UNPUBLISH
                          </Button>
                        )}
                        <Button
                          size="small"
                          name={`delete-list${index}`}
                          sx={{ fontSize: buttonFontSize }}
                          color="error"
                          onClick={() => deleteListing(listing)}
                        >
                          DELETE
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </main>
          {/* Footer */}
          <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Copyright />
          </Box>
          {/* End footer */}
          <ToastContainer
            position='top-center'
            autoClose={4000}
            hideProgressBar={false}
            closeOnClick
            pauseOnFocusLoss={false}
          />
          {showCreate && (
            <Listcreate close={closeCreate} update={props.update} />
          )}
          {showPublish[1] && (
            <ListPublish
              close={closePublish}
              update={props.update}
              listingid={showPublish[1]}
            />
          )}
          <Outlet />
        </div>
          )
        : (
          <NoPermission />
          )}
    </>
  );
}
