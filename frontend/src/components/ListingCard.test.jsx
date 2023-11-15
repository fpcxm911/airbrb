import * as React from 'react';
import { render } from '@testing-library/react';
import ListingCard from './ListingCard';

it('should render the listing card with no reviews', () => {
  const listing = {
    thumbnail: 'thumbnail.jpg',
    title: 'Listing Title',
    metadata: {
      propertyType: 'House',
      numberOfBathrooms: 2,
      bedrooms: [],
    },
    reviews: [],
    price: '100',
  };

  const result = render(
    <ListingCard listing = {listing} hotedPgae = {false}/>
  );
  expect(result.getByRole('img')).toBeInTheDocument();
  expect(result.getByText('No reviews yet')).toBeInTheDocument();
  expect(result.getByText(/Property type : House/i)).toBeInTheDocument();
  expect(result.getByText(/Number of bathrooms : 2/i)).toBeInTheDocument();
  expect(result.getByText(/Number of beds : 0/i)).toBeInTheDocument();
  expect(result.getByText(/PRICE : 100/i)).toBeInTheDocument();
});

it('rendering review ratings', () => {
  const listing = {
    thumbnail: 'thumbnail.jpg',
    title: 'Listing Title',
    metadata: {
      propertyType: 'House',
      numberOfBathrooms: 2,
      bedrooms: [],
    },
    reviews: [
      {
        userEmail: 'cust@email.com',
        bookingId: 799384397,
        rating: 4,
        comment: 'absolute boncus',
        date: '2023-11-15T06:52:35.278Z'
      },
      {
        userEmail: 'cust@email.com',
        bookingId: 799384397,
        rating: 1,
        comment: 'insects bite me!!!',
        date: '2023-11-15T06:53:05.811Z'
      }
    ],
  };

  const result = render(
      <ListingCard listing = {listing} hotedPgae = {false}/>
  );
  result.debug();
  expect(result.getByText(/2.5/i)).toBeInTheDocument();
  expect(result.getByText(/Number of reviews : 2/i)).toBeInTheDocument();
});
