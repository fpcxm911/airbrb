import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BedroomRangeSlider from './BedroomRangeSlider';

describe('BedroomRangeSlider', () => {
  it('should render slider with 2 sliders, input field and default values', () => {
    const result = render(<BedroomRangeSlider />);
    expect(result.getAllByRole('slider').length).toBe(2);
    const slider = result.container.querySelector('.bedroom-range-slider');
    expect(slider).toBeInTheDocument();

    const input = result.container.querySelector('#bedroomRangeHiddenInput')
    expect(input).toBeInTheDocument();
    // bedroom default value should be 3 and 5
    expect(input.value).toBe('3-5');
  });

  it('should update slider values when dragged', () => {
    const result = render(<BedroomRangeSlider />);
    result.debug();

    const sliders = result.getAllByRole('slider');
    const input = result.container.querySelector('#bedroomRangeHiddenInput')
    fireEvent.change(sliders[0], { target: { value: 4 } });
    fireEvent.change(sliders[1], { target: { value: 7 } });
    expect(input.value).toBe('4-7');
  })

  it('should update slider values when dragged to the min value', () => {
    const result = render(<BedroomRangeSlider />);
    const sliders = result.getAllByRole('slider');
    fireEvent.change(sliders[0], { target: { value: 1 } });
    const input = result.container.querySelector('#bedroomRangeHiddenInput')
    expect(input.value).toBe('1-5');
  });

  it('should update slider values when dragged to the max value', () => {
    const result = render(<BedroomRangeSlider />);
    const sliders = result.getAllByRole('slider');
    fireEvent.change(sliders[1], { target: { value: 10 } });
    const input = result.container.querySelector('#bedroomRangeHiddenInput')
    expect(input.value).toBe('3-10');
  })

  it('should limit the max and min of slider', () => {
    const result = render(<BedroomRangeSlider />);
    const sliders = result.getAllByRole('slider');
    expect(sliders[0].max).toBe('10');
    expect(sliders[0].min).toBe('1');
    expect(sliders[1].max).toBe('10');
    expect(sliders[1].min).toBe('1');
    fireEvent.change(sliders[0], { target: { value: -5 } });
    fireEvent.change(sliders[1], { target: { value: 11 } });
    const input = result.container.querySelector('#bedroomRangeHiddenInput')
    expect(input.value).toBe('1-10');
  });
});
