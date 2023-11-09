import * as React from 'react';
import Slider from '@mui/material/Slider';
import { Input } from '@mui/material';

const BedroomRangeSlider = () => {
  const [value, setValue] = React.useState([3, 5]);
  const [hiddenBedroomRange, setHiddenBedroomRange] = React.useState('');

  React.useEffect(() => {
    setHiddenBedroomRange(value.join('-'));
  }, [value]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Slider
        getAriaLabel={() => 'Bedroom range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay='auto'
        getAriaValueText={(value) => `${value}`}
        min={1}
        max={10}
        step={1}
      />
      <Input type='hidden' name='bedroomRange' value={hiddenBedroomRange} />
    </>
  );
};
export default BedroomRangeSlider;
