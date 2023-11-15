import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AvailabilityRange from './AvailabilityRange';

describe('AvailabilityRange', () => {
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
    expect(result.container.querySelector('#removeInputRole')).toBeInTheDocument();
    expect(result.container.querySelector('#startDateInput0')).toBeInTheDocument();
    expect(result.container.querySelector('#endDateInput0')).toBeInTheDocument();
    expect(result.getByText('Start date 1')).toBeInTheDocument();
    expect(result.getByText('End date 1')).toBeInTheDocument();
    expect(result.getByText('Add availability range')).toBeInTheDocument();
    expect(result.container.querySelector('#startDateInput1')).not.toBeInTheDocument();
    expect(result.container.querySelector('#endDateInput1')).not.toBeInTheDocument();
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
    expect(result.container.querySelector('#startDateInput1')).toBeInTheDocument();
    expect(result.container.querySelector('#endDateInput1')).toBeInTheDocument();
  });

  // Allows user to remove date input fields
  it('should allow user to remove date input fields', () => {
    // Arrange
    const props = {
      setSubmit: jest.fn(),
      singleRange: false,
      availability: []
    };

    // Act
    const result = render(<AvailabilityRange {...props} />);
    userEvent.click(result.getByRole('button', { name: 'Add availability range' }));
    // add a new date input field
    expect(result.getByRole('button', { name: 'Add availability range' })).toBeInTheDocument();
    // then remove the field
    userEvent.click(result.container.querySelector('#removeInputRole'));

    // Assert
    expect(result.container.querySelector('#startDateInput0')).toBeInTheDocument();
    expect(result.container.querySelector('#endDateInput0')).toBeInTheDocument();
    expect(result.container.querySelector('#startDateInput1')).not.toBeInTheDocument();
    expect(result.container.querySelector('#endDateInput1')).not.toBeInTheDocument();
  });

  // user cannot remove the only date input field
  it('should not allow user to remove the only date input field', () => {
    // Arrange
    const props = {
      setSubmit: jest.fn(),
      singleRange: false,
      availability: []
    };

    // Act
    const result = render(<AvailabilityRange {...props} />);
    // try to remove the field
    userEvent.click(result.container.querySelector('#removeInputRole'));

    // Assert
    expect(result.container.querySelector('#startDateInput0')).toBeInTheDocument();
    expect(result.container.querySelector('#endDateInput0')).toBeInTheDocument();
    expect(result.container.querySelector('#startDateInput1')).not.toBeInTheDocument();
    expect(result.container.querySelector('#endDateInput1')).not.toBeInTheDocument();
  });
});
