import * as React from 'react';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, TextField, DialogContentText } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { apiCallGetAuthen, calculateAverageRating, sortListings } from '../pages/Helper';
import BedroomRangeSlider from './BedroomRangeSlider';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import PriceSlider from './PriceSlider';
import DateSearch from './DateSearch';

// TODO eric if no listing is found, show some message
const SearchBar = (props) => {
  const [searchOption, setSearchOption] = React.useState('titleLocation');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [clickable, setClickable] = React.useState(true);

  const handleSelectChange = (event) => {
    setSearchOption(event.target.value);
  }

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
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
    let searchInput;
    let filteredList;
    switch (searchOption) {
      case 'titleLocation':
        searchInput = data.get('title').toLowerCase().split(' ').filter(str => str !== '');
        filteredList = newList.filter((listing) => {
          const lowercaseTitle = listing.title.toLowerCase();
          const lowercaseAddress = Object.entries(listing.address).map(([key, value]) => value).join(' ').toLowerCase();
          return searchInput.some(keyword => lowercaseTitle.includes(keyword) || lowercaseAddress.includes(keyword));
        });
        props.update(filteredList);
        break;
      case 'bedrooms':
        searchInput = data.get('bedroomRange').split('-');
        filteredList = newList.filter((listing) => {
          return listing.metadata.bedrooms.length >= Number(searchInput[0]) && listing.metadata.bedrooms.length <= Number(searchInput[1]);
        });
        props.update(filteredList);
        break;
      case 'date':
        searchInput = JSON.parse(data.get('dates'));
        filteredList = newList.filter((listing) => {
          for (const range of listing.availability) {
            const rangeStart = new Date(range.start);
            const rangeEnd = new Date(range.end);
            if (new Date(searchInput.start) >= rangeStart && new Date(searchInput.end) <= rangeEnd) {
              return true;
            }
          }
          return false;
        });
        props.update(filteredList);
        break;
      case 'price':
        searchInput = data.get('priceRange').split('-');
        filteredList = newList.filter((listing) => {
          return Number(listing.price) >= Number(searchInput[0]) && Number(listing.price) <= Number(searchInput[1]);
        })
        props.update(filteredList);
        break;
      case 'reviews':
        searchInput = data.get('review');
        newList.forEach((listing) => {
          listing.averageRating = isNaN(calculateAverageRating(listing)) ? -1 : calculateAverageRating(listing);
        })
        filteredList = newList.filter((listing) => {
          return true;
        })
        filteredList.sort((a, b) => {
          if (searchInput === 'high to low') {
            return b.averageRating - a.averageRating;
          } else if (searchInput === 'low to high') {
            // put no reviews at the end
            if (a.averageRating === -1) {
              a.averageRating = 999;
            }
            if (b.averageRating === -1) {
              b.averageRating = 999;
            }
            return a.averageRating - b.averageRating;
          } else {
            console.error('invalid review rating input');
            setErrorMessage({ title: 'Error', body: 'invalid review rating input' });
            return 0;
          }
        })
        props.update(filteredList);
        break;
      default:
        console.error('invalid search option');
        props.update(filteredList);
        break;
    }
  }

  return (
    // TODO eric recheck nothing overflow in the searchbar component
    <>
      <Paper
        component="form"
        sx={{ p: '2px 6px', display: 'flex', alignItems: 'center', height: 95, minWidth: 395 }}
        onSubmit={handleSearchSubmit}
      >
        {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <Grid
          container
          spacing={1}
          wrap='nowrap'
          alignItems={'center'}
          justifyContent={'center'}>
          <Grid item xs={5} sx={{ alignItems: 'center' }}>
            <FormControl fullWidth>
              <InputLabel id='search-option-label'>Search Option</InputLabel>
              <Select
                required
                labelId='search-option-label'
                label="Package Type"
                id='search-option-select'
                key='search-option-select'
                value={searchOption}
                onChange={handleSelectChange}
                divider={<Divider orientation="vertical" flexItem />}
                sx={{ width: 145, disableUnderline: true }}
              >
                {optionsArray.map((option) => {
                  return (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sx={{ alignItems: 'center' }}>
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
              <BedroomRangeSlider />
            )}
            {/* // TODO eric search bar width gets too big when date range option is selected */}
            {searchOption === 'date' && (
              <DateSearch setSearch={setClickable} setErrorMessage={setErrorMessage} />
            )}
            {searchOption === 'price' && (
              <PriceSlider />
            )}
            {/* {searchOption === 'reviews' && (
              <ReviewFilter />
            )} */}
          </Grid>
          <Grid item xs={1} sx={{ alignItems: 'center', pr: 2 }}>
            <IconButton type="submit" aria-label="search" disabled={!clickable} sx={{ p: 0 }}>
              <SearchIcon style={{ fill: 'blue' }} />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      {/* <form>
        <TextField
          id="search-bar"
          className="text"
          // onInput={(e) => {
          //   setSearchQuery(e.target.value);
          // }}
          label="Search listings"
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
        <IconButton type="submit" aria-label="search" onClick={(e) => e.preventDefault()}>
          <SearchIcon style={{ fill: 'blue' }} />
        </IconButton>
      </form> */}
      <DialogContentText color='error'>
        {errorMessage}
      </DialogContentText>
    </>
  );
}
const optionsArray = [
  { value: 'titleLocation', label: 'Title location' },
  { value: 'bedrooms', label: 'Bedrooms' },
  { value: 'date', label: 'Date' },
  { value: 'price', label: 'Price' }
]
export default SearchBar;
