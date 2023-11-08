import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { calculateAverageRating, calculateNumBeds } from '../pages/Helper';

const ListingCard = (props) => {
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
    <CardContent sx={{ flexGrow: 1, ml: 1 }} >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }} >
          {props.listing.title}
        </Typography>
      </Box>
      <Typography variant="body2" gutterBottom >
        Property type : {props.listing.metadata.propertyType}
      </Typography>
      <Typography variant="body2" gutterBottom >
        Number of bathrooms : {props.listing.metadata.numberOfBathrooms}
      </Typography>

      <Typography variant="body2" gutterBottom >
        Number of beds : {calculateNumBeds(props.listing)}
      </Typography>

      <Box sx={{ mt: 3, height: '80px' }}>
        {props.listing.reviews.length === 0
          ? <Box sx={{ pt: 3 }}>
              <Typography variant="body2" gutterBottom >
                No reviews yet
              </Typography>
            </Box>
          : <>
            <Box sx={{ display: 'flex' }}>
              <Rating
                value={calculateAverageRating(props.listing)}
                readOnly
                precision={0.1}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }}
                sx={{ mb: 1 }}
                fontSize="inherit" />} />
              <Typography variant="body2" sx={{ ml: 2 }}>{calculateAverageRating(props.listing)}</Typography>
            </Box>
            <Typography variant="body2" gutterBottom >
              Number of reviews : {props.listing.reviews.length}
            </Typography>
          </>
        }
      </Box>
      <Typography variant="button" gutterBottom sx={{ fontWeight: 'bold' }}>
        Price : {props.listing.price} AUD / NIGHT
      </Typography>
    </CardContent>
  </>
  );
};

export default ListingCard;
