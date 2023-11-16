import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import BookingDisplay from '../components/BookingDisplay';

describe('BookingDisplay', () => {
  it('should render a table with the correct columns', () => {
    const props = {
      current: true,
      data: [
        {
          id: 78204786,
          owner: 'lily@unsw.edu.au',
          dateRange: { start: '2022-01-01', end: '2022-01-05' },
          totalPrice: 800,
          listingId: 56513315,
          status: 'accepted',
        },
        {
          id: 78204786,
          owner: 'lily@unsw.edu.au',
          dateRange: { start: '2022-01-01', end: '2022-01-05' },
          totalPrice: 300,
          listingId: 56513315,
          status: 'pending',
        },
        {
          id: 78204786,
          owner: 'lily@unsw.edu.au',
          dateRange: { start: '2022-01-01', end: '2022-01-05' },
          totalPrice: 500,
          listingId: 56513415,
          status: 'declined',
        },
      ],
      toastError: jest.fn(),
      setBookingUpdate: jest.fn(),
    };

    const result = render(<BookingDisplay {...props} />);

    expect(result.getByText('Owner Email')).toBeInTheDocument();
    expect(result.getByText('Start Date')).toBeInTheDocument();
    expect(result.getByText('End Date')).toBeInTheDocument();
    expect(result.getByText('Total Price')).toBeInTheDocument();
    expect(result.getByText('Handle Request')).toBeInTheDocument();
  });

  it('should render a table with the correct data', () => {
    const props = {
      current: true,
      data: [
        {
          id: 78204786,
          owner: 'lily@unsw.edu.au',
          dateRange: { start: '2022-01-01', end: '2022-01-05' },
          totalPrice: 800,
          listingId: 56513315,
          status: 'accepted',
        },
        {
          id: 78204786,
          owner: 'lily@unsw.edu.au',
          dateRange: { start: '2022-01-01', end: '2022-01-05' },
          totalPrice: 300,
          listingId: 56513315,
          status: 'pending',
        },
        {
          id: 78204786,
          owner: 'lily@unsw.edu.au',
          dateRange: { start: '2022-01-01', end: '2022-01-05' },
          totalPrice: 500,
          listingId: 56513415,
          status: 'declined',
        },
      ],
      toastError: jest.fn(),
      setBookingUpdate: jest.fn(),
    };

    const result = render(<BookingDisplay {...props} />);

    expect(result.getAllByRole('row')).toHaveLength(4);
    expect(
      result.container.querySelector('.renderListContainer').childElementCount
    ).toBe(3);
    const rows = result.container.querySelectorAll('.bookingRow');
    expect(rows).toHaveLength(3);
    expect(rows[0].querySelectorAll('td')).toHaveLength(5);
    expect(rows[0].querySelectorAll('td')[0].textContent).toBe(
      'lily@unsw.edu.au'
    );
    expect(rows[0].querySelectorAll('td')[1].textContent).toBe(
      '1st January 2022'
    );
    expect(rows[0].querySelectorAll('td')[2].textContent).toBe(
      '5th January 2022'
    );
    expect(rows[0].querySelectorAll('td')[3].textContent).toBe('$800');
  });

  it('should display the correct title depending on the "current" prop', () => {
    const props = {
      current: false,
      data: [
        {
          id: 78204786,
          owner: 'lily@unsw.edu.au',
          dateRange: { start: '2022-01-01', end: '2022-01-05' },
          totalPrice: 800,
          listingId: 56513315,
          status: 'accepted',
        },
        {
          id: 78204786,
          owner: 'lily@unsw.edu.au',
          dateRange: { start: '2022-01-01', end: '2022-01-05' },
          totalPrice: 300,
          listingId: 56513315,
          status: 'pending',
        },
        {
          id: 78204786,
          owner: 'lily@unsw.edu.au',
          dateRange: { start: '2022-01-01', end: '2022-01-05' },
          totalPrice: 500,
          listingId: 56513415,
          status: 'declined',
        },
      ],
      toastError: jest.fn(),
      setBookingUpdate: jest.fn(),
    };

    const result = render(<BookingDisplay {...props} />);

    expect(result.getByText('Booking History')).toBeInTheDocument();
  });

  it('should handle pagination correctly', () => {
    const props = {
      current: true,
      data: [
        {
          id: 78204786,
          owner: 'lily@unsw.edu.au',
          dateRange: { start: '2022-01-01', end: '2022-01-05' },
          totalPrice: 800,
          listingId: 56513315,
          status: 'accepted',
        },
        {
          id: 78204786,
          owner: 'lily@unsw.edu.au',
          dateRange: { start: '2022-01-01', end: '2022-01-05' },
          totalPrice: 300,
          listingId: 56513315,
          status: 'pending',
        },
        {
          id: 78204786,
          owner: 'lily@unsw.edu.au',
          dateRange: { start: '2022-01-01', end: '2022-01-05' },
          totalPrice: 500,
          listingId: 56513415,
          status: 'declined',
        },
        {
          id: 78204786,
          owner: 'lily@unsw.edu.au',
          dateRange: { start: '2022-01-01', end: '2022-01-05' },
          totalPrice: 500,
          listingId: 56513415,
          status: 'declined',
        },
        {
          id: 78204786,
          owner: 'lily@unsw.edu.au',
          dateRange: { start: '2022-01-01', end: '2022-01-05' },
          totalPrice: 500,
          listingId: 56513415,
          status: 'declined',
        },
      ],
      toastError: jest.fn(),
      setBookingUpdate: jest.fn(),
    };

    const result = render(<BookingDisplay {...props} />);

    expect(result.getAllByRole('row')).toHaveLength(6);
    expect(result.getByRole('navigation')).toBeInTheDocument();

    const pagination = result.getByRole('navigation');
    fireEvent.change(pagination, { EventTarget: { value: 2 } });

    expect(result.getByText('Owner Email')).toBeInTheDocument();
    expect(result.getByText('Start Date')).toBeInTheDocument();
    expect(result.getByText('End Date')).toBeInTheDocument();
    expect(result.getByText('Total Price')).toBeInTheDocument();
    expect(result.getByText('Handle Request')).toBeInTheDocument();
  });

  it('should render a table with no data', () => {
    const props = {
      current: true,
      data: [],
      toastError: jest.fn(),
      setBookingUpdate: jest.fn(),
    };

    const { container } = render(<BookingDisplay {...props} />);
    const tableRows = container.querySelectorAll('.bookingRow');

    expect(tableRows).toHaveLength(0);
  });
});
