import React from 'react';
import { Grid, TableContainer, Typography } from '@mui/material';
import { parseISO, format } from 'date-fns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';

export default function BookingStatus (props) {
  // create usestate to record current page bookings for rendering and record the current page number
  const [renderList, setRenderLst] = React.useState([]);
  const [pageNum, setPageNum] = React.useState(1);
  // calculate total page number base on all bookings, one page present 5 bookings
  const totalPage = Math.ceil(props.bookings.length / 5);
  // update pagenumber after user click the pagination
  const handlePageChange = (event, newPageNumber) => {
    setPageNum(newPageNumber);
  };

  // set bookings to be rendered base on page number
  React.useEffect(() => {
    if (props.bookings.length !== 0) {
      const start = (pageNum - 1) * 5;
      const end = pageNum * 5;
      const currentPage = props.bookings.slice(start, end);
      setRenderLst(currentPage);
    }
  }, [pageNum, props.bookings]);

  return (
    <Grid width={'100%'}>
      <Typography component='h2' variant='h6' gutterBottom>
        Your Booking Summary
      </Typography>
      <TableContainer>
        <Table size='large'>
          <TableHead>
            <TableRow>
              <TableCell>Owner Email</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Booking Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderList.map((booking, idx) => (
              <TableRow key={idx}>
                <TableCell>{booking.owner}</TableCell>
                <TableCell>
                  {format(parseISO(booking.dateRange.start), 'do MMMM yyyy')}
                </TableCell>
                <TableCell>
                  {format(parseISO(booking.dateRange.end), 'do MMMM yyyy')}
                </TableCell>
                <TableCell>{`$${booking.totalPrice}`}</TableCell>
                <TableCell>{`${booking.status}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justifyContent={'center'} sx={{ mt: 2 }}>
        <Pagination
          count={totalPage}
          color='primary'
          onChange={handlePageChange}
        />
      </Grid>
    </Grid>
  );
}
