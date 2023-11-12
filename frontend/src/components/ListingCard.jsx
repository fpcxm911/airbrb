import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { calculateAverageRating, calculateNumBeds } from '../pages/Helper';
import { Grid, Popover } from '@mui/material';
import RatingCategory from './RatingCategory';

const ListingCard = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const popoverAnchor = React.useRef(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <CardMedia
        component="div"
        sx={{
          // 16:9
          pt: '56.25%',
        }}
        image={props.listing.thumbnail}
      />
      <CardContent sx={{ flexGrow: 1, ml: 1 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {props.listing.title}
          </Typography>
        </Box>
        <Typography variant="body2" gutterBottom>
          Property type : {props.listing.metadata.propertyType}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Number of bathrooms : {props.listing.metadata.numberOfBathrooms}
        </Typography>

        <Typography variant="body2" gutterBottom>
          Number of beds : {calculateNumBeds(props.listing)}
        </Typography>

        <Box sx={{ mt: 3, height: '80px' }}>
          {props.listing.reviews.length === 0
            ? (
            <Box sx={{ pt: 3 }}>
              <Typography variant="body2" gutterBottom>
                No reviews yet
              </Typography>
            </Box>
              )
            : (
            <>
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                <Grid
                  item
                  aria-owns={props.hotedPage ? 'mouse-over-popover' : undefined}
                  aria-haspopup={props.hotedPage ? 'true' : undefined}
                  onMouseEnter={props.hotedPage ? handlePopoverOpen : undefined}
                  onMouseLeave={
                    props.hotedPage ? handlePopoverClose : undefined
                  }
                  ref={popoverAnchor}
                  sx={{ cursor: 'pointer' }}
                >
                  <Rating
                    value={calculateAverageRating(props.listing)}
                    readOnly
                    precision={0.1}
                    emptyIcon={
                      <StarIcon
                        sx={{ mb: 1, opacity: 0.55 }}
                        fontSize="inherit"
                      />
                    }
                  />
                </Grid>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  {calculateAverageRating(props.listing)}
                </Typography>
              </Box>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={open}
                anchorEl={popoverAnchor.current}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                disableRestoreFocus
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                <Grid sx={{ p: 5, pointerEvents: 'auto' }}>
                  <Grid container sx={{ mb: 2 }}>
                    <Rating
                      value={calculateAverageRating(props.listing)}
                      readOnly
                      precision={0.1}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          sx={{ mb: 1 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    <Typography variant="subtitle" sx={{ ml: 2 }}>
                      {`${calculateAverageRating(props.listing)} out of 5`}
                    </Typography>
                  </Grid>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', mb: 2 }}
                  >
                    {`${props.listing.reviews.length} global ratings`}
                  </Typography>
                  <RatingCategory category={1} percentage={30} />
                  <RatingCategory category={2} percentage={30} />
                  <RatingCategory category={3} percentage={30} />
                  <RatingCategory category={4} percentage={30} />
                  <RatingCategory category={5} percentage={30} />
                </Grid>
              </Popover>
              <Typography variant="body2" gutterBottom>
                Number of reviews : {props.listing.reviews.length}
              </Typography>
            </>
              )}
        </Box>
        <Typography variant="button" gutterBottom sx={{ fontWeight: 'bold' }}>
          Price : {props.listing.price} AUD / NIGHT
        </Typography>
      </CardContent>
    </>
  );
};

export default ListingCard;
