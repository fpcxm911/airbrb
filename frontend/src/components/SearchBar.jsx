import * as React from 'react';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, TextField, DialogContentText } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { apiCallGetAuthen, sortListings } from '../pages/Helper';
// TODO eric if no listing is found, show some message
const SearchBar = (props) => {
  const [searchOption, setSearchOption] = React.useState('titleLocation');
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    console.log(searchOption);
  }, [searchOption])

  const handleSelectChange = (event) => {
    setSearchOption(event.target.value);
  }

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log('search submit');
    console.log(`searchOption: ${searchOption}`);
    console.log('search value');
    const data = new FormData(e.currentTarget);
    console.log(data.get('title'));
    const res = await apiCallGetAuthen('listings');
    if (res.error) {
      setErrorMessage({ title: 'Error', body: res.error });
      console.error(res.error);
      return;
    }
    const listingsDetail = [];
    for (const listing of res.listings) {
      const detailRes = await apiCallGetAuthen(`listings/${listing.id}`);
      if (detailRes.error) {
        setErrorMessage({ title: 'Error', body: detailRes.error });
        return;
      }
      const collectListingData = detailRes.listing;
      collectListingData.id = listing.id;
      listingsDetail.push(collectListingData);
    }
    // TODO eric wired eslint warning
    const newList = await sortListings(listingsDetail.filter(x => x.published));
    if (newList.error) {
      setErrorMessage({ title: 'Error', body: newList.error });
      return;
    }
    let words;
    let filteredList;
    switch (searchOption) {
      case 'titleLocation':
        console.log('filtering by title');
        words = data.get('title').toLowerCase().split(' ').filter(str => str !== '');
        filteredList = newList.filter((listing) => {
          const lowercaseTitle = listing.title.toLowerCase();
          const lowercaseAddress = Object.entries(listing.address).map(([key, value]) => value).join(' ').toLowerCase();
          return words.some(keyword => lowercaseTitle.includes(keyword) || lowercaseAddress.includes(keyword));
        });
        console.log('filteredList: ', filteredList);
        props.update(filteredList);
        break;
      case 'bedrooms':
        console.log('filtering by bedrooms');
        props.update(filteredList);
        break;
      case 'date':
        console.log('filtering by date');
        props.update(filteredList);
        break;
      case 'price':
        console.log('filtering by price');
        props.update(filteredList);
        break;
      case 'reviews':
        console.log('filtering by reviews');
        props.update(filteredList);
        break;
      default:
        console.error('invalid search option');
        props.update(filteredList);
        break;
    }
  }

  return (
    <>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 415 }}
        onSubmit={handleSearchSubmit}
      >
        {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <FormControl>
          <InputLabel id='search-option-label'>Search Option</InputLabel>
          <Select
            required
            labelId='search-option-label'
            label="Package Type"
            id='search-option-select'
            key='search-option-select'
            value={searchOption}
            onChange={handleSelectChange}
            sx={{ width: 155, disableUnderline: true }}
          >
            {optionsArray.map((option) => {
              return (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        {searchOption === 'titleLocation' && (
          <TextField
            required
            type='text'
            name='title'
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Listings"
            variant='standard'
            InputProps={{ disableUnderline: true }}
          />
        )}
        {searchOption === 'bedrooms' && (
          <p>bedrooms slider</p>
        )}
        {searchOption === 'date' && (
          <p>date range</p>
        )}
        {searchOption === 'price' && (
          <p>price slider</p>
        )}
        {searchOption === 'reviews' && (
          <p>reviews slider, lowest to highest or vice versa</p>
        )}
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" >
          <SearchIcon />
        </IconButton>
      </Paper>
      <DialogContentText color='error' sx={{ mb: 2 }}>
        {errorMessage}
      </DialogContentText>
    </>
  );
}
const optionsArray = [
  { value: 'titleLocation', label: 'Title location' },
  { value: 'bedrooms', label: 'Bedrooms' },
  { value: 'date', label: 'Date' },
  { value: 'price', label: 'Price' },
  { value: 'reviews', label: 'Reviews' },
]
export default SearchBar;
