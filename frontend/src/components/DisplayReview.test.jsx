import * as React from 'react';
import { render } from '@testing-library/react';
import DisplayReview from './DisplayReview';

describe('DisplayReview', () => {
  // Renders the average rating of the listing
  it('should render the average rating when there are reviews', () => {
    const listing = {
      reviews: [
        {
          userEmail: 'cust@email.com',
          bookingId: 799384397,
          rating: 4,
          comment: 'absolute boncus',
          date: '2023-11-15T06:52:35.278Z',
        },
        {
          userEmail: 'cust@email.com',
          bookingId: 799384397,
          rating: 5,
          comment: 'absolute boncus',
          date: '2023-11-15T06:52:35.278Z',
        },
        {
          userEmail: 'cust@email.com',
          bookingId: 799384397,
          rating: 3,
          comment: 'absolute boncus',
          date: '2023-11-15T06:52:35.278Z',
        },
      ],
    };

    const result = render(<DisplayReview listing={listing} />);

    // Assert
    expect(result.getByText('4')).toBeInTheDocument();
    expect(result.getByText('Slide to view other reviews')).toBeInTheDocument();
  });

  // Renders a carousel of reviews in reverse chronological order
  it('should render a carousel of reviews', () => {
    const listing = {
      reviews: [
        {
          userEmail: 'cust@email.com',
          bookingId: 799384397,
          rating: 4,
          comment: 'absolute boncus',
          date: '2023-11-15T06:52:35.278Z',
        },
        {
          userEmail: 'cust@email.com',
          bookingId: 799384397,
          rating: 5,
          comment: 'absolute boncus',
          date: '2023-11-15T06:52:35.278Z',
        },
        {
          userEmail: 'cust@email.com',
          bookingId: 799384397,
          rating: 3,
          comment: 'absolute boncus',
          date: '2023-11-15T06:52:35.278Z',
        },
      ],
    };

    const result = render(<DisplayReview listing={listing} />);

    // Assert
    expect(result.getByText('Slide to view other reviews')).toBeInTheDocument();
    expect(result.container.querySelector('.carousel')).toBeInTheDocument();
    expect(result.container.querySelector('.carousel').childElementCount).toBe(
      2
    );
  });

  // Listing has one review
  it('should render the single review', () => {
    const listing = {
      reviews: [
        {
          userEmail: 'cust@email.com',
          bookingId: 799384397,
          rating: 4,
          comment: 'absolute boncus',
          date: '2023-11-15T06:52:35.278Z',
        },
      ],
    };

    const result = render(<DisplayReview listing={listing} />);
    const carouselItems = result.container.querySelector('.carousel').children;
    expect(carouselItems.length).toBe(1);
  });
});
