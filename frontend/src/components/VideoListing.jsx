import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import Icon from '@mdi/react';
import { mdiVideo, mdiPlayCircle } from '@mdi/js';
import ReactPlayer from 'react-player';

const VideoListing = (props) => {
  const url = props.url;
  return (
    <>
      <Grid container alignItems={'center'} sx={{ pt: 3 }}>
        <Icon path={mdiVideo} size={2} />
        <Typography variant='h6' color='text.primary' sx={{ pl: 2 }}>
          Checkout the video
        </Typography>
      </Grid>
      <Grid
        container
        alignItems={'center'}
        justifyContent={'center'}
        position={'relative'}
        sx={{ pt: 3 }}
      >
        <ReactPlayer
          url={url}
          controls={true}
          light={true}
          playing={true}
          playIcon={<Icon path={mdiPlayCircle} size={3} />}
          position={'absolute'}
          sx={{ pt: '56.25%' }}
        />
      </Grid>
    </>
  );
};

export default VideoListing;
