import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AvailabilityRange from './AvailabilityRange';

describe('AvailabilityRange', () => {
  it('should render a single date input row when props.singleRange is true', () => {
    const props = {
      singleRange: true,
      setSubmit: jest.fn(),
      availability: []
    };
    render(<AvailabilityRange {...props} />);
    expect(screen.getByText('Check-in date')).toBeInTheDocument();
    expect(screen.getByText('Check-out date')).toBeInTheDocument();
  });

  // Renders multiple date input rows when props.singleRange is false
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
  // Displays an error message when the start date is after the end date
  it('should display an error message when the start date is after the end date', () => {
    const props = {
      setSubmit: jest.fn(),
      singleRange: true,
      availability: []
    };
    const result = render(<AvailabilityRange {...props} />);
    const checkinInput = result.container.querySelector('#startDateInput0');
    const checkoutInput = result.container.querySelector('#endDateInput0');
    userEvent.type(checkinInput, '2022-01-01');
    userEvent.type(checkoutInput, '2021-01-01');
    const errorMessage = result.getByText('Check-in date must precede check-out date');
    expect(errorMessage).toBeInTheDocument();
  });
  // Updates the hiddenDatesInput state with a JSON stringified version of the dates array when the dates array changes
  it('should update hiddenDatesInput state when dates array changes', () => {
    const props = {
      setSubmit: jest.fn(),
      singleRange: false,
      availability: []
    };

    const { container } = render(<AvailabilityRange {...props} />);
    const startDateInput = container.querySelector('#startDateInput0');
    const endDateInput = container.querySelector('#endDateInput0');

    fireEvent.change(startDateInput, { target: { value: '2022-01-01' } });
    fireEvent.change(endDateInput, { target: { value: '2022-01-02' } });

    const hiddenDatesInput = container.querySelector('input[name="dates"]');
    expect(hiddenDatesInput.value).toBe('[{"start":"2022-01-01","end":"2022-01-02"}]');
  });

  // Sets the submit state to true when all dates are valid and there are no overlaps
  it('should set submit state to true when all dates are valid and there are no overlaps', () => {
    const props = {
      setSubmit: jest.fn(),
      singleRange: false,
      availability: []
    };

    const { container } = render(<AvailabilityRange {...props} />);
    const startDateInput = container.querySelector('#startDateInput0');
    const endDateInput = container.querySelector('#endDateInput0');

    fireEvent.change(startDateInput, { target: { value: '2022-01-01' } });
    fireEvent.change(endDateInput, { target: { value: '2022-01-02' } });

    expect(props.setSubmit).toHaveBeenCalledWith(true);
  });

  // Sets the submit state to false when there are invalid dates or overlaps
  it('should set submit state to false when there are invalid dates or overlaps', () => {
    const props = {
      singleRange: false,
      setSubmit: jest.fn(),
      availability: []
    };
    const { container } = render(<AvailabilityRange {...props} />);

    const startDateInput = container.querySelector('#startDateInput0');
    const endDateInput = container.querySelector('#endDateInput0');

    fireEvent.change(startDateInput, { target: { value: '2022-01-01' } });
    fireEvent.change(endDateInput, { target: { value: '2021-12-31' } });

    // Check if submit state is set to false
    expect(props.setSubmit).toHaveBeenCalledWith(false);
  });

  // Does not display an error message when all dates are valid and there are no overlaps
  it('should not display an error message when all dates are valid and there are no overlaps', () => {
    const props = {
      singleRange: false,
      setSubmit: jest.fn(),
      availability: []
    };
    const { container } = render(<AvailabilityRange {...props} />);

    const startDateInput = container.querySelector('#startDateInput0');
    const endDateInput = container.querySelector('#endDateInput0');

    fireEvent.change(startDateInput, { target: { value: '2022-01-01' } });
    fireEvent.change(endDateInput, { target: { value: '2022-01-02' } });

    // Check if error message is not displayed
    expect(screen.queryByText('Start date must precede end date in row 1')).toBeNull();
  });
});
