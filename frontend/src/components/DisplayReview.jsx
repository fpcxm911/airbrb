import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Grid, Typography, Box, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { calculateAverageRating } from '../pages/Helper';
import { parseISO, format } from 'date-fns';
import defaultImage from '../assets/man.png';
import FullReview from './FullReview';

export default function DisplayReview (props) {
  // create a copied listings and reverse it so that lastest review become first element
  const copiedReviews = [...props.listing.reviews];
  const reversedReviews = copiedReviews.reverse();
  // create usestate to record current review in Carousel
  // create usestate to decide whether should open the full content review modal
  const [fullReview, setShowFullReview] = React.useState(false);
  const [reviewTarget, setReviewTarget] = React.useState(null);

  // onclick handle if user click full content review button
  const handleOnclick = (item) => {
    setShowFullReview(true);
    setReviewTarget(item);
  };
  return (
    <div id='reviews-display'>
      <Grid container justifyContent={'center'}>
        <StarBorderIcon sx={{ fontSize: '70px', mr: 2 }} />
        <Typography variant='h2' color='text.primary' paragraph>
          {calculateAverageRating(props.listing)}
        </Typography>
      </Grid>
      <Typography
        variant='subtitle1'
        color='text.secondary'
        align='center'
        paragraph
      >
        Slide to view other reviews
      </Typography>
      <Carousel
        sx={{ width: '100%', mb: 2 }}
        duration={500}
        swipe
        indicators={false}
        autoPlay={false}
        cycleNavigation={false}
        animation='slide'
        className='carousel'
      >
        {reversedReviews.map((item, i) => (
          <Box key={i} height={'270px'}>
            <Grid container justifyContent={'center'} sx={{ mb: 2 }}>
              <Button variant='text' onClick={() => handleOnclick(item)}>
                Click Here to view full content of review
              </Button>
            </Grid>
            <Grid container alignItems={'center'} sx={{ mb: 2 }}>
              <Avatar
                alt='Remy Sharp'
                src={defaultImage}
                sx={{ width: 56, height: 56 }}
              />
              <Typography variant='body2' color={'text.primary'} sx={{ ml: 2 }}>
                {item.userEmail}
              </Typography>
            </Grid>
            <Grid container>
              <Grid container>
                <Rating
                  value={item.rating}
                  readOnly
                  precision={0.1}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />
                  }
                />
                <Typography variant='body2' sx={{ ml: 2 }}>
                  {' '}
                  {format(parseISO(item.date), 'do MMMM yyyy')}
                </Typography>
              </Grid>
              <Typography
                variant='body2'
                sx={{
                  WebkitLineClamp: '3',
                  WebkitBoxOrient: 'vertical',
                  display: '-webkit-box',
                  mt: 3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.comment}
              </Typography>
            </Grid>
          </Box>
        ))}
      </Carousel>
      {fullReview && (
        <FullReview
          close={() => setShowFullReview(false)}
          content={reviewTarget}
        />
      )}
    </div>
  );
}
