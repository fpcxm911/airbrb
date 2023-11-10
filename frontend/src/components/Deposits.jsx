import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Grid } from '@mui/material';
export default function Deposits () {
  return (
    <Grid container height= '100%' alignItems={'center'}>
      <Grid item>
        <Title>Recent Deposits</Title>
        <Typography component="p" variant="h4" sx={{ my: 3 }}>
          $3,024.00
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          on 15 March, 2019
        </Typography>
      </Grid>
    </Grid>
  );
}
