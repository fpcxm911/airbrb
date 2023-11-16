import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Box, Grid, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import defaultImage from '../assets/man.png';
import { parseISO, format } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function FullReview (props) {
  return (
    <React.Fragment>
      <Dialog
        onClose={props.close}
        open
        PaperProps={{ sx: { borderRadius: 6 } }}
      >
        <IconButton
          aria-label='close'
          onClick={props.close}
          size='small'
          sx={{
            position: 'absolute',
            right: 7,
            top: 7,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          dividers
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            ml: 1.5,
            mr: 1.5,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#00a3fa' }}>
            <RateReviewIcon />
          </Avatar>
          <Typography component='h1' variant='h5' sx={{ mb: 2 }}>
            Full content for review
          </Typography>
          <Box sx={{ overflowY: 'auto' }}>
            <Box sx={{ mb: 5, '&:hover': { backgroundColor: '#eee' } }}>
              <Grid container alignItems={'center'} sx={{ mb: 1 }}>
                <Avatar
                  alt='Remy Sharp'
                  src={defaultImage}
                  sx={{ width: 56, height: 56 }}
                />
                <Typography
                  variant='body2'
                  color={'text.primary'}
                  sx={{ ml: 2 }}
                >
                  {props.content.userEmail}
                </Typography>
              </Grid>
              <Grid container>
                <Grid container>
                  <Rating
                    value={props.content.rating}
                    readOnly
                    precision={0.1}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />
                    }
                  />
                  <Typography variant='body2' sx={{ ml: 2 }}>
                    {' '}
                    {format(parseISO(props.content.date), 'do MMMM yyyy')}
                  </Typography>
                </Grid>
                <Typography
                  variant='body2'
                  sx={{
                    mt: 1,
                  }}
                >
                  {props.content.comment}
                </Typography>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
