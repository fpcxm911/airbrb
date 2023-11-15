import * as React from 'react';
import Icon from '@mdi/react';
import { Grid, Typography } from '@mui/material';
import { mdiAlertCircleOutline } from '@mdi/js';

const NoResult = () => {
  return (
    <>
      <Grid
        container
        spacing={4}
        justifyContent={'flex-end'}
        alignItems={'center'}
        sx={{ mt: 3 }}
      >
        <Grid item xs={2}>
          <Icon path={mdiAlertCircleOutline} size={1} />
        </Grid>
        <Grid item xs={8}>
          <Typography component='h6' gutterBottom>
            Sorry, we could not find any listing
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default NoResult;
