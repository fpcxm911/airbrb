import * as React from 'react';
import { render, screen } from '@testing-library/react';
import ListingCard from './ListingCard';

describe('ListingCard', () => {
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

  it('should render the listing card with reviews', () => {
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
    expect(result.getByText(/2.5/i)).toBeInTheDocument();
    expect(result.getByText(/Number of reviews : 2/i)).toBeInTheDocument();
  });

  it('should render the listing card with a popover', () => {
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
          userEmail: 'john@example.com',
          rating: 4,
          comment: 'Great place to stay!',
          date: '2022-10-15T06:52:35.278Z'
        },
        {
          userEmail: 'jane@example.com',
          rating: 5,
          comment: 'Amazing experience!',
          date: '2022-10-16T06:53:05.811Z'
        }
      ],
      price: '100',
    };

    render(<ListingCard listing={listing} hotedPage={true} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('rendering different title', () => {
    const listing = {
      thumbnail: 'thumbnail.jpg',
      title: 'different title',
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
          rating: 3,
          comment: 'insects bite me!!!',
          date: '2023-11-15T06:53:05.811Z'
        },
        {
          userEmail: 'cust@email.com',
          bookingId: 799384397,
          rating: 3,
          comment: 'insects bite me!!!',
          date: '2023-11-15T06:53:05.811Z'
        }
      ],
    };

    const result = render(
        <ListingCard listing = {listing} hotedPgae = {false}/>
    );
    expect(result.getByText(/different title/i)).toBeInTheDocument();
    expect(result.getByText(/Number of reviews : 3/i)).toBeInTheDocument();
    expect(result.getByText(/3.3/i)).toBeInTheDocument();
  });
})
