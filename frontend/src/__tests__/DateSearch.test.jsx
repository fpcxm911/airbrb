import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DateSearch from '../components/DateSearch';

describe('DateSearch', () => {
  it('should render two date input fields with labels', () => {
    const setSearch = jest.fn();
    const result = render(<DateSearch setSearch={setSearch} />);

    expect(result.getByText('Start date')).toBeInTheDocument();
    expect(result.getByText('End date')).toBeInTheDocument();
  });

  it('two textfield should be type date', () => {
    const setSearch = jest.fn();
    const setErrorMessage = jest.fn();

    const result = render(
      <DateSearch setSearch={setSearch} setErrorMessage={setErrorMessage} />
    );

    const startTextfield = result.container.querySelector('#start_date_input');
    const endTextfield = result.container.querySelector('#end_date_input');

    expect(startTextfield.type).toBe('date');
    expect(endTextfield.type).toBe('date');
  });

  it('should allows user to select start and end dates', () => {
    const setSearch = jest.fn();
    const setErrorMessage = jest.fn();

    const result = render(
      <DateSearch setSearch={setSearch} setErrorMessage={setErrorMessage} />
    );

    const startTextfield = result.container.querySelector('#start_date_input');
    const endTextfield = result.container.querySelector('#end_date_input');

    fireEvent.change(startTextfield, { target: { value: '2022-01-01' } });
    fireEvent.change(endTextfield, { target: { value: '2022-01-31' } });

    expect(startTextfield.value).toBe('2022-01-01');
    expect(endTextfield.value).toBe('2022-01-31');
  });

  it('should reflect user input to hidden input element', () => {
    const setSearch = jest.fn();
    const setErrorMessage = jest.fn();
    const result = render(
      <DateSearch setSearch={setSearch} setErrorMessage={setErrorMessage} />
    );

    const startTextfield = result.container.querySelector('#start_date_input');
    const endTextfield = result.container.querySelector('#end_date_input');
    const hiddenInput = result.container.querySelector('#search_dates_input');

    fireEvent.change(startTextfield, { target: { value: '2024-01-01' } });
    fireEvent.change(endTextfield, { target: { value: '2024-01-31' } });

    expect(hiddenInput.value).toBe('{"start":"2024-01-01","end":"2024-01-31"}');
  });

  it('should display toast when start date is after end date', () => {
    const setSearch = jest.fn();
    const setErrorMessage = jest.fn();

    const result = render(
      <DateSearch setSearch={setSearch} setErrorMessage={setErrorMessage} />
    );

    const startTextfield = result.container.querySelector('#start_date_input');
    const endTextfield = result.container.querySelector('#end_date_input');

    fireEvent.change(startTextfield, { target: { value: '2024-01-31' } });
    fireEvent.change(endTextfield, { target: { value: '2024-01-01' } });

    expect(setErrorMessage).toHaveBeenCalledTimes(1);
  });

  it('should call error when start date is in the past', () => {
    const setSearch = jest.fn();
    const setErrorMessage = jest.fn();
    const result = render(
      <DateSearch setSearch={setSearch} setErrorMessage={setErrorMessage} />
    );

    const startTextfield = result.container.querySelector('#start_date_input');
    const endTextfield = result.container.querySelector('#end_date_input');

    fireEvent.change(startTextfield, { target: { value: '2023-11-01' } });
    fireEvent.change(endTextfield, { target: { value: '2024-01-01' } });

    expect(setErrorMessage).toHaveBeenCalledTimes(1);
  });

  it('should not allow user to select same start and end date', () => {
    const setSearch = jest.fn();
    const setErrorMessage = jest.fn();
    const result = render(
      <DateSearch setSearch={setSearch} setErrorMessage={setErrorMessage} />
    );

    const startTextfield = result.container.querySelector('#start_date_input');
    const endTextfield = result.container.querySelector('#end_date_input');

    fireEvent.change(startTextfield, { target: { value: '2024-01-01' } });
    fireEvent.change(endTextfield, { target: { value: '2024-01-01' } });

    expect(setErrorMessage).toHaveBeenCalledTimes(1);
  });

  it('should not display error message when valid dates are selected', () => {
    const setSearch = jest.fn();
    const setErrorMessage = jest.fn();

    const result = render(
      <DateSearch setSearch={setSearch} setErrorMessage={setErrorMessage} />
    );

    const startTextfield = result.container.querySelector('#start_date_input');
    const endTextfield = result.container.querySelector('#end_date_input');

    fireEvent.change(startTextfield, { target: { value: '2023-12-20' } });
    fireEvent.change(endTextfield, { target: { value: '2023-12-29' } });

    expect(setErrorMessage).toHaveBeenCalledTimes(0);
  });

  it('should allow only start date to be selected', () => {
    const setSearch = jest.fn();
    const setErrorMessage = jest.fn();
    const result = render(
      <DateSearch setSearch={setSearch} setErrorMessage={setErrorMessage} />
    );

    const startTextfield = result.container.querySelector('#start_date_input');
    const endTextfield = result.container.querySelector('#end_date_input');

    fireEvent.change(startTextfield, { target: { value: '2024-01-01' } });
    fireEvent.change(endTextfield, { target: { value: '' } });

    expect(setErrorMessage).toHaveBeenCalledTimes(0);
  });

  it('should allow only end date to be selected', () => {
    const setSearch = jest.fn();
    const setErrorMessage = jest.fn();
    const result = render(
      <DateSearch setSearch={setSearch} setErrorMessage={setErrorMessage} />
    );

    const startTextfield = result.container.querySelector('#start_date_input');
    const endTextfield = result.container.querySelector('#end_date_input');

    fireEvent.change(startTextfield, { target: { value: '' } });
    fireEvent.change(endTextfield, { target: { value: '2024-01-01' } });

    expect(setErrorMessage).toHaveBeenCalledTimes(0);
  });
});
