import * as React from 'react';
import { render, userEvent } from '@testing-library/react';
import AvailabilityRange from './AvailabilityRange';

it('should render two date input fields and add button', () => {
  // Arrange
  const props = {
    setSubmit: jest.fn(),
    singleRange: false,
    availability: []
  };

  // Act
  const result = render(<AvailabilityRange {...props} />);
  // Assert
  expect(result.getByRole('button', { name: 'Add availability range' })).toBeInTheDocument();
  expect(result.container.querySelector('#startDateInput0')).toBeInTheDocument();
  expect(result.container.querySelector('#endDateInput0')).toBeInTheDocument();
  expect(result.getByText('Start date 1')).toBeInTheDocument();
  expect(result.getByText('End date 1')).toBeInTheDocument();
  expect(result.container.querySelector('#startDateInput1')).not.toBeInTheDocument();
  expect(result.container.querySelector('#endDateInput1')).not.toBeInTheDocument();
  result.debug();
});

// Allows user to add more date input fields
it('should allow user to add more date input fields', () => {
  // Arrange
  const props = {
    setSubmit: jest.fn(),
    singleRange: false,
    availability: []
  };

  // Act
  const result = render(<AvailabilityRange {...props} />);
  userEvent.click(result.getByRole('button', { name: 'Add availability range' }));
  expect(result.getByRole('button', { name: 'Add availability range' })).toBeInTheDocument();
  // Assert
  expect(result.container.querySelector('#startDateInput0')).toBeInTheDocument();
  expect(result.container.querySelector('#endDateInput0')).toBeInTheDocument();
  expect(result.getByText('Start date 1')).toBeInTheDocument();
  expect(result.getByText('End date 1')).toBeInTheDocument();
  expect(result.container.querySelector('#startDateInput1')).not.toBeInTheDocument();
  expect(result.container.querySelector('#endDateInput1')).not.toBeInTheDocument();
  result.debug();
});
