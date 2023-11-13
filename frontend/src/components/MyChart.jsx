import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { startOfDay, differenceInDays } from 'date-fns';
import { apiCallGetAuthen } from '../pages/Helper';

const MyChart = (props) => {
  const [listBookings, setListBookings] = React.useState([]);
  React.useEffect(async () => {
    const bookingRes = await apiCallGetAuthen(
      'bookings',
      localStorage.getItem('token')
    );
    if (bookingRes.error) {
      props.setErrorMessage({ title: 'Error', body: bookingRes.error });
      props.setShowModal(true);
    } else {
      const myBookings = bookingRes.bookings.filter(
        (x) =>
          props.myListings.map(x => String(x.id)).includes(String(x.listingId)) && x.status === 'accepted'
      );
      setListBookings(myBookings);
    }
  }, [props.myListings]);
  // console.log(listBookings);
  const generateChart = () => {
    // Get the current date
    const datas = []
    const today = startOfDay(new Date());
    for (let i = 0; i < 30; i++) {
      datas.push({ name: i, profit: 0 })
    }
    // console.log(datas);
    for (const booking of listBookings) {
      const startDate = new Date(booking.dateRange.start);
      const endDate = new Date(booking.dateRange.end);
      const dayDiffStart = differenceInDays(today, startDate);
      const dayDiffEnd = differenceInDays(endDate, today);
      const dayDiffStartEnd = differenceInDays(endDate, startDate);
      if (dayDiffStart < 30 && dayDiffStart >= 0 && dayDiffEnd > 0) {
        console.log(startDate);
        console.log(endDate);
        console.log(booking);
        console.log();
        for (let index = 0; index <= dayDiffStart; index++) {
          console.log(index);
          datas[index].profit += booking.totalPrice / dayDiffStartEnd;
        }
      } else if (dayDiffStart < 30 && dayDiffStart >= 0 && dayDiffEnd < 0) {
        console.log(startDate);
        console.log(endDate);
        console.log(booking);
        console.log();
        for (let index = Math.abs(dayDiffEnd); index <= dayDiffStart; index++) {
          console.log(index);
          datas[index].profit += booking.totalPrice / dayDiffStartEnd;
        }
      }
    }
    return datas;
  }
  // generateChart();
  // const data = [
  //   { name: 'Category 1', profit: 10 },
  //   { name: 'Category 2', profit: 20 },
  //   { name: 'Category 3', profit: 15 },
  //   // Add more data as needed
  // ];

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

export default MyChart;
