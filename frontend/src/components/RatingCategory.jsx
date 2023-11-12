import * as React from 'react';
import { LinearProgress, Grid, styled, Typography } from '@mui/material';

const MyProgressBar = styled(LinearProgress)({
  height: 15,
});

export default function RatingCategory (props) {
  return (
    <Grid container alignItems="center" sx={{ my: 1, cursor: 'pointer' }} onClick={props.prepare}>
      <Grid item flex = {1.3} sx={{ mr: 2 }}>
        <Typography variant="body2">{props.category} Star</Typography>
      </Grid>
      <Grid item flex = {4}>
        <MyProgressBar variant="determinate" value={Number(props.percentage)} />
      </Grid>
      <Grid container flex = {4} justifyContent={'flex-end'}>
        <Grid item sx={{ ml: 2 }} >
          <Typography variant="body2">{props.percentage}% - total {props.total}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
