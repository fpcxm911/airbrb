import * as React from 'react';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { apiCallGetAuthen, sortListings } from '../pages/Helper';
import BedroomRangeSlider from './BedroomRangeSlider';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import PriceSlider from './PriceSlider';
import DateSearch from './DateSearch';
import differenceInDays from 'date-fns/differenceInDays';
import { ToastContainer, toast } from 'react-toastify';

const SearchBar = (props) => {
  const [searchOption, setSearchOption] = React.useState('titleLocation');
  const [clickable, setClickable] = React.useState(true);

  React.useEffect(() => {
    setClickable(true);
  }, [searchOption]);

  const toastWarning = (msg) => {
    toast.warning(msg);
  };
  const toastError = (msg) => {
    toast.error(msg);
  };

  const handleSelectChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleSearchSubmit = async (e) => {
    props.setNumberOfNights(null);
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const res = await apiCallGetAuthen('listings');
    if (res.error) {
      toastError(res.error);
      console.error(res.error);
      return;
    }
    const listingsDetail = [];
    for (const listing of res.listings) {
      const detailRes = await apiCallGetAuthen(`listings/${listing.id}`);
      if (detailRes.error) {
        toastError(detailRes.error);
        return;
      }
      const collectListingData = detailRes.listing;
      collectListingData.id = listing.id;
      listingsDetail.push(collectListingData);
    }
    const newList = await sortListings(
      listingsDetail.filter((x) => x.published)
    );
    if (newList.error) {
      toastError(newList.error);
      return;
    }
    let searchInput;
    let filteredList;
    switch (searchOption) {
      case 'titleLocation':
        searchInput = data
          .get('title')
          .toLowerCase()
          .split(' ')
          .filter((str) => str !== '');
        filteredList = newList.filter((listing) => {
          const lowercaseTitle = listing.title.toLowerCase();
          const lowercaseAddress = Object.entries(listing.address)
            .map(([key, value]) => value)
            .join(' ')
            .toLowerCase();
          return searchInput.some(
            (keyword) =>
              lowercaseTitle.includes(keyword) ||
              lowercaseAddress.includes(keyword)
          );
        });
        props.update(filteredList);
        break;
      case 'bedrooms':
        searchInput = data.get('bedroomRange').split('-');
        filteredList = newList.filter((listing) => {
          return (
            listing.metadata.bedrooms.length >= Number(searchInput[0]) &&
            listing.metadata.bedrooms.length <= Number(searchInput[1])
          );
        });
        props.update(filteredList);
        break;
      case 'date':
        searchInput = JSON.parse(data.get('dates'));
        filteredList = newList.filter((listing) => {
          for (const range of listing.availability) {
            const rangeStart = new Date(range.start);
            const rangeEnd = new Date(range.end);
            if (
              new Date(searchInput.start) >= rangeStart &&
              new Date(searchInput.end) <= rangeEnd
            ) {
              return true;
            }
          }
          return false;
        });
        props.setNumberOfNights(
          differenceInDays(
            new Date(searchInput.end),
            new Date(searchInput.start)
          )
        );
        props.update(filteredList);
        break;
      case 'price':
        searchInput = data.get('priceRange').split('-');
        filteredList = newList.filter((listing) => {
          return (
            Number(listing.price) >= Number(searchInput[0]) &&
            Number(listing.price) <= Number(searchInput[1])
          );
        });
        props.update(filteredList);
        break;
      default:
        console.error('invalid search option');
        props.update(filteredList);
        break;
    }
  };

  return (
    <>
      <Paper
        component='form'
        sx={{
          p: '2px 6px',
          display: 'flex',
          alignItems: 'center',
          height: 95,
          minWidth: 395,
        }}
        onSubmit={handleSearchSubmit}
      >
        <Grid
          container
          spacing={1}
          wrap='nowrap'
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Grid item xs={5} sx={{ alignItems: 'center' }}>
            <FormControl fullWidth>
              <InputLabel id='search-option-label'>Search Option</InputLabel>
              <Select
                required
                labelId='search-option-label'
                label='Package Type'
                id='search-option-select'
                key='search-option-select'
                value={searchOption}
                onChange={handleSelectChange}
                divider={<Divider orientation='vertical' flexItem />}
                sx={{ width: 145, disableUnderline: true }}
              >
                {optionsArray.map((option) => {
                  return (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  );
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
                placeholder='Search Listings'
                variant='standard'
                InputProps={{ disableUnderline: true }}
              />
            )}
            {searchOption === 'bedrooms' && <BedroomRangeSlider />}
            {searchOption === 'date' && (
              <DateSearch
                setSearch={setClickable}
                setErrorMessage={toastWarning}
              />
            )}
            {searchOption === 'price' && <PriceSlider />}
          </Grid>
          <Grid item xs={1} sx={{ alignItems: 'center', pr: 2 }}>
            <IconButton
              type='submit'
              aria-label='search'
              disabled={!clickable}
              sx={{ p: 0 }}
            >
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      <ToastContainer
        position='top-center'
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss={false}
        limit={2}
      />
    </>
  );
};
const optionsArray = [
  { value: 'titleLocation', label: 'Title location' },
  { value: 'bedrooms', label: 'Bedrooms' },
  { value: 'date', label: 'Date' },
  { value: 'price', label: 'Price/night' },
];
export default SearchBar;
