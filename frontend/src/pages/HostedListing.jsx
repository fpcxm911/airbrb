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
import { apiCallGetAuthen } from './Helper';
import ErrorDialog from '../components/ErrorPopup';
import Listcreate from './Listcreate';
import { useContext, Context } from '../context';

// TODO remove, this demo shouldn't need to reset the theme.

export default function HostedListing () {
  const { getters } = useContext(Context);
  const [HostedLists, setHostedLists] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showCreate, setShowCreate] = React.useState(false);
  const closeCreate = () => {
    setShowCreate(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  React.useEffect(async () => {
    const res = await apiCallGetAuthen('listings');
    if (res.error) {
      setErrorMessage({ title: 'Error', body: res.error });
      setShowModal(true);
    } else {
      const currentUserEmail = getters.email;
      console.log(currentUserEmail);
      const myListings = res.listings.filter(x => x.owner === currentUserEmail)
      const myListingsDetail = []
      for (const listing of myListings) {
        const deatailRes = await apiCallGetAuthen(`listings/${listing.id}`);
        if (deatailRes.error) {
          setErrorMessage({ title: 'Error', body: res.error });
          setShowModal(true);
        } else {
          myListingsDetail.push(deatailRes)
        }
      }
      setHostedLists(myListingsDetail)
    }
  }, []);
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
              <Button variant="outlined">Go back</Button>
            </Stack>
          </Container>
        </Box>
        <Box sx={{ py: 8, mx: 10 }} >
          {/* End hero unit */}
          <Grid container spacing={4}>
            {HostedLists.map((listing) => (
              <Grid item key={listing} xs={12} sm={6} md={3}>
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
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {listing.title}
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">EDIT</Button>
                    <Button size="small">DELETE</Button>
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
      {showModal && (<ErrorDialog close = {closeModal} content = {errorMessage} />)}
      {showCreate && (<Listcreate close = {closeCreate}/>)}
    </div>
  );
}
