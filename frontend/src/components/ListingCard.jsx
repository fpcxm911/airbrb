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
import Decimal from 'decimal.js';
import ReviewByCategory from './ReviewByCategory';

const ListingCard = (props) => {
  // usestate to record the position of hovering rating
  const [anchorEl, setAnchorEl] = React.useState(null);
  // usestate to decide whether or not opening the review modal
  const [showReview, setShowReview] = React.useState(false);
  // usestate to record the reviews should be present in review modal
  const [reviews, setReviews] = React.useState([]);
  // usestate to record the rating category for present reviews in review modal
  const [reviewCategory, setReviewCategory] = React.useState([]);

  // close review modal
  const closeReviews = () => {
    setShowReview(false);
  };

  // hovering rating
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // stop hovering rating
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const popoverAnchor = React.useRef(null);
  const open = Boolean(anchorEl);

  // collect reviews by rating category (1-5 star)
  const collectRatingByCategory = (category) => {
    const categoryRatings = props.listing.reviews.filter(
      (x) => x.rating === category
    );
    return categoryRatings;
  };

  // calculate the percentage current rating reviews in all reviews
  const calculatePercentage = (ratings) => {
    const percentage = (ratings.length / props.listing.reviews.length) * 100;
    const convertPercentage = new Decimal(percentage);
    const convertedPercentage = convertPercentage.toFixed(1);
    return convertedPercentage;
  };

  // prepare to display ratings with given category in reivew modal
  const prepareReviews = (category) => {
    setReviews(collectRatingByCategory(category));
    setShowReview(true);
    setReviewCategory(category);
  };
  return (
    <>
      <CardMedia
        component='div'
        sx={{
          // 16:9
          pt: '56.25%',
        }}
        image={props.listing.thumbnail}
      />
      <CardContent sx={{ flexGrow: 1, ml: 1 }}>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant='h6'
            sx={{ fontWeight: 'bold' }}
            id={`title${props.index}`}
          >
            {props.listing.title}
          </Typography>
        </Box>
        <Typography variant='body2' gutterBottom id={`prop-type${props.index}`}>
          Property type : {props.listing.metadata.propertyType}
        </Typography>
        <Typography variant='body2' gutterBottom id={`num-bath${props.index}`}>
          Number of bathrooms : {props.listing.metadata.numberOfBathrooms}
        </Typography>

        <Typography variant='body2' gutterBottom id={`num-beds${props.index}`}>
          Number of beds : {calculateNumBeds(props.listing)}
        </Typography>

        <Box sx={{ mt: 3, height: '80px' }}>
          {props.listing.reviews.length === 0
            ? (
            <Box sx={{ pt: 3 }}>
              <Typography variant='body2' gutterBottom>
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
                        fontSize='inherit'
                      />
                    }
                  />
                </Grid>
                <Typography variant='body2' sx={{ ml: 2 }}>
                  {calculateAverageRating(props.listing)}
                </Typography>
              </Box>
              <Popover
                id='mouse-over-popover'
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
                <Grid sx={{ p: 5, pointerEvents: 'auto', width: '380px' }}>
                  <Grid container sx={{ mb: 2 }}>
                    <Rating
                      value={calculateAverageRating(props.listing)}
                      readOnly
                      precision={0.1}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          sx={{ mb: 1 }}
                          fontSize='inherit'
                        />
                      }
                    />
                    <Typography variant='subtitle' sx={{ ml: 2 }}>
                      {`${calculateAverageRating(props.listing)} out of 5`}
                    </Typography>
                  </Grid>
                  <Typography
                    variant='body2'
                    sx={{ color: 'text.secondary', mb: 2 }}
                  >
                    {`${props.listing.reviews.length} global ratings`}
                  </Typography>
                  <RatingCategory
                    category={1}
                    percentage={calculatePercentage(collectRatingByCategory(1))}
                    prepare={() => prepareReviews(1)}
                    total={collectRatingByCategory(1).length}
                  />
                  <RatingCategory
                    category={2}
                    percentage={calculatePercentage(collectRatingByCategory(2))}
                    prepare={() => prepareReviews(2)}
                    total={collectRatingByCategory(2).length}
                  />
                  <RatingCategory
                    category={3}
                    percentage={calculatePercentage(collectRatingByCategory(3))}
                    prepare={() => prepareReviews(3)}
                    total={collectRatingByCategory(3).length}
                  />
                  <RatingCategory
                    category={4}
                    percentage={calculatePercentage(collectRatingByCategory(4))}
                    prepare={() => prepareReviews(4)}
                    total={collectRatingByCategory(4).length}
                  />
                  <RatingCategory
                    category={5}
                    percentage={calculatePercentage(collectRatingByCategory(5))}
                    prepare={() => prepareReviews(5)}
                    total={collectRatingByCategory(5).length}
                  />
                </Grid>
              </Popover>
              <Typography variant='body2' gutterBottom>
                Number of reviews : {props.listing.reviews.length}
              </Typography>
            </>
              )}
        </Box>
        <Typography
          variant='button'
          gutterBottom
          sx={{ fontWeight: 'bold' }}
          id={`price${props.index}`}
        >
          Price : {props.listing.price} AUD / NIGHT
        </Typography>
      </CardContent>
      {showReview && (
        <ReviewByCategory
          close={closeReviews}
          content={reviews}
          category={reviewCategory}
        />
      )}
    </>
  );
};

export default ListingCard;
