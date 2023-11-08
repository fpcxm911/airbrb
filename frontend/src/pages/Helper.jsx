const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const USERNAME_REGEX = /^[A-Za-z0-9_]{3,20}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

const apiCallPostNoAuthen = async (path, body) => {
  try {
    const response = await fetch(`http://localhost:5005/${path}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    // Handle error appropriately
    console.error('Error:', error);
    throw error;
  }
};

// authorize http get request
const apiCallGetAuthen = async (path, token, queryString) => {
  try {
    const response = await fetch(`http://localhost:5005/${path}?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    // Handle error appropriately
    console.error('Error:', error);
    throw error;
  }
};

// authorize http request with body
const apiCallBodyAuthen = async (path, token, body, method) => {
  try {
    const response = await fetch(`http://localhost:5005/${path}`, {
      method,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    // Handle error appropriately
    console.error('Error:', error);
    throw error;
  }
};

const fileToDataUrl = (file) => {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
  const valid = validFileTypes.find(type => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
};

const createMeta = (numberOfBathrooms, propertyType, bedrooms, amenities, youtubeUrl, propertyImages) => {
  return {
    propertyType,
    numberOfBathrooms,
    amenities,
    bedrooms,
    youtubeUrl,
    propertyImages
  }
};

const createAddress = (country, city, street, postcode) => {
  return {
    country,
    city,
    street,
    postcode
  }
};

const checkLogin = () => {
  return localStorage.getItem('token') && localStorage.getItem('email')
};

/**
 * Sorts the given listings based on specific criteria (login status, bookings status).
 *
 * @param {Array} listings - The array of listings to be sorted.
 * @return {Array} - The sorted array of listings.
 */
const sortListings = async (listings) => {
  // have login
  if (checkLogin()) {
    const res = await apiCallGetAuthen('bookings', localStorage.getItem('token'));
    if (res.error) {
      console.error('Error:', res.error);
      throw res.error;
    } else {
      const accecptPendingBookings = res.bookings.filter(x => x.status === 'accepted' || x.status === 'pending');
      const extractedLitingsId = accecptPendingBookings.map(x => x.listingId);
      return listings.sort((a, b) => {
        const aIn = extractedLitingsId.includes(a.id);
        const bIn = extractedLitingsId.includes(b.id);
        if (aIn && !bIn) {
          return -1;
        } else if (!aIn && bIn) {
          return 1;
        } else if (aIn && bIn) {
          return 1;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    }
  } else {
    return listings.sort((a, b) => a.title.localeCompare(b.title));
  }
}

export {
  EMAIL_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
  apiCallPostNoAuthen,
  apiCallGetAuthen,
  apiCallBodyAuthen,
  fileToDataUrl,
  createMeta,
  createAddress,
  checkLogin,
  sortListings
};
