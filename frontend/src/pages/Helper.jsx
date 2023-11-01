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

export {
  EMAIL_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
  apiCallPostNoAuthen,
  apiCallGetAuthen,
  apiCallBodyAuthen
};
