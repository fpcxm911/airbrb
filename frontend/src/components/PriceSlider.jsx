import * as React from 'react';
import Slider from '@mui/material/Slider';
import { Input } from '@mui/material';

const PriceSlider = () => {
  const [value, setValue] = React.useState([100, 550]);
  const [hiddenPriceRange, setHiddenPriceRange] = React.useState('');

  React.useEffect(() => {
    setHiddenPriceRange(value.join('-'));
  }, [value]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay='auto'
        getAriaValueText={(value) => `${value}`}
        min={0}
        max={1000}
        step={20}
      />
      <Input type='hidden' name='priceRange' value={hiddenPriceRange} />
    </>
  );
}

export default PriceSlider;
