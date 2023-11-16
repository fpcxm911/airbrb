// regular expression to validate sign up details
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const USERNAME_REGEX = /^[A-Za-z0-9_]{3,20}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

// no token authentication apicall with POST method
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
    const response = await fetch(
      `http://localhost:5005/${path}?${queryString}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (error) {
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
    console.error('Error:', error);
    throw error;
  }
};

// upload image helper function
const fileToDataUrl = (file) => {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const valid = validFileTypes.find((type) => type === file.type);
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

// given metadata, create an object encapsulate them
const createMeta = (
  numberOfBathrooms,
  propertyType,
  bedrooms,
  amenities,
  youtubeUrl,
  propertyImages
) => {
  return {
    propertyType,
    numberOfBathrooms,
    amenities,
    bedrooms,
    youtubeUrl,
    propertyImages,
  };
};

// given address details, create an object encapsulate them
const createAddress = (country, city, street, postcode) => {
  return {
    country,
    city,
    street,
    postcode,
  };
};

// check if login
const checkLogin = () => {
  return localStorage.getItem('token') && localStorage.getItem('email');
};

// calculate the total numer of bed for a listing
const calculateNumBeds = (listing) => {
  return listing.metadata.bedrooms.reduce(
    (accumulator, bedroom) => accumulator + Number(bedroom.numberOfBeds),
    0
  );
};

// calculate the total numer of bedrooms for a listing
const calculateNumBedrooms = (listing) => {
  return listing.metadata.bedrooms.length;
};

// calculate average rating hepler
const convertPrecision = (number) => {
  return Math.round(number * 10) / 10;
};

// calculate the average rating for a listing
const calculateAverageRating = (listing) => {
  const sum = listing.reviews.reduce(
    (accumulator, review) => accumulator + review.rating,
    0
  );
  return convertPrecision(sum / listing.reviews.length);
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
    const res = await apiCallGetAuthen(
      'bookings',
      localStorage.getItem('token')
    );
    if (res.error) {
      console.error('Error:', res.error);
      throw res.error;
    } else {
      const accecptPendingBookings = res.bookings.filter(
        (x) => x.status === 'accepted' || x.status === 'pending'
      );
      const extractedLitingsId = accecptPendingBookings.map((x) => x.listingId);
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
};

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
  calculateNumBeds,
  calculateAverageRating,
  calculateNumBedrooms,
  sortListings,
};
