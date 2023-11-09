import * as React from 'react';
import { Select, InputLabel, MenuItem, Input } from '@mui/material';
import FormControl from '@mui/material/FormControl';

const ReviewFilter = () => {
  const [sortOption, setSortOption] = React.useState('');
  const [hiddenInput, setHiddenInput] = React.useState('');

  const handleChange = (event) => {
    setSortOption(event.target.value);
  }

  React.useEffect(() => {
    setHiddenInput(sortOption);
  }, [sortOption])

  return (
    // <Autocomplete
    //   disablePortal
    //   options={orderOptions}
    //   defaultValue={orderOptions[0]}
    //   renderInput={(params) => <TextField {...params} label='Sort by' name='review'/>}
    // />
    <>
      <FormControl fullWidth>
          <InputLabel id='review-id'>Sort by</InputLabel>
          <Select
            labelId='review-id'
            id='sort-select'
            value={sortOption}
            label="Sort by"
            required
            onChange={handleChange}
          >
            <MenuItem value={'high to low'}>high to low</MenuItem>
            <MenuItem value={'low to high'}>low to high</MenuItem>
          </Select>
      </FormControl>
      <Input type='hidden' name='review' value={hiddenInput} />
    </>
  )
}

// const orderOptions = [
//   { label: 'high to low' },
//   { label: 'low to high' },
// ]

export default ReviewFilter;
