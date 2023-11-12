import * as React from 'react';
import { LinearProgress, Grid, styled, Typography } from '@mui/material';

const MyProgressBar = styled(LinearProgress)({
  height: 10,
  borderRadius: 5,
});

export default function RatingCategory (props) {
  return (
    <Grid container alignItems="center" sx={{ my: 1, cursor: 'pointer' }}>
      <Grid item sx={{ mr: 2 }}>
        <Typography variant="body2">{props.category} Star</Typography>
      </Grid>
      <Grid item xs>
        <MyProgressBar variant="determinate" value={props.percentage} />
      </Grid>
      <Grid item sx={{ ml: 2 }}>
        <Typography variant="body2">{props.percentage}%</Typography>
      </Grid>
    </Grid>
  );
}
