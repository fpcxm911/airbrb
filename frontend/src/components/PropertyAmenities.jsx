import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function PropertyAmenities () {
  const [selectedAmenities, setSelectedAmenities] = React.useState([]);
  const [hiddenInputValue, setHiddenInputValue] = React.useState([]);

  React.useEffect(() => {
    setHiddenInputValue((selectedAmenities.join(',')));
  }, [selectedAmenities]);

  const handleAmenitiesChange = (event, values) => {
    setSelectedAmenities(values);
  };
  return (
    <>
      <Autocomplete
        onChange={handleAmenitiesChange}
        value={selectedAmenities}
        multiple
        options={amenitiesOptions}
        disableCloseOnSelect
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Amenities (Optional)" name='amen' placeholder="Optional" />
        )}
      />
      <input type="hidden" name="amenities" value={hiddenInputValue} />
    </>
  );
}

const amenitiesOptions = [
  'Wifi',
  'Wash Machine',
  'Oven',
  'Pool',
  'Air Conditioning',
];
