import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { subDays, differenceInDays, format } from 'date-fns';
import { apiCallGetAuthen } from '../pages/Helper';

const ProfitChart = (props) => {
  const [listBookings, setListBookings] = React.useState([]);
  React.useEffect(async () => {
    const bookingRes = await apiCallGetAuthen(
      'bookings',
      localStorage.getItem('token')
    );
    if (bookingRes.error) {
      props.toastError(bookingRes.error);
    } else {
      const myBookings = bookingRes.bookings.filter(
        (x) =>
          props.myListings.map(x => String(x.id)).includes(String(x.listingId)) && x.status === 'accepted'
      );
      setListBookings(myBookings);
    }
  }, [props.myListings]);
  const generateChart = () => {
    // Get the current date
    const datas = []
    const now = new Date();
    const today = new Date(now.toISOString().split('T')[0])
    for (let i = 0; i <= 30; i++) {
      const date = subDays(today, i);
      const formatDate = format(date, 'MM/dd')
      datas.push({ name: formatDate, profit: 0 })
    }
    for (const booking of listBookings) {
      const startDate = new Date(booking.dateRange.start);
      const endDate = new Date(booking.dateRange.end);
      const dayDiffStart = differenceInDays(today, startDate);
      const dayDiffEnd = differenceInDays(endDate, today);
      const dayDiffStartEnd = differenceInDays(endDate, startDate);
      if (dayDiffStart <= 30 && dayDiffStart >= 0 && dayDiffEnd > 0) {
        for (let index = 0; index <= dayDiffStart; index++) {
          datas[index].profit += booking.totalPrice / dayDiffStartEnd;
        }
      } else if (dayDiffStart <= 30 && dayDiffStart >= 0 && dayDiffEnd <= 0) {
        for (let index = dayDiffStart; index > Math.abs(dayDiffEnd); index--) {
          datas[index].profit += booking.totalPrice / dayDiffStartEnd;
        }
      }
    }
    return datas;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
    <BarChart data={generateChart()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="profit" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
  );
};

export default ProfitChart;
