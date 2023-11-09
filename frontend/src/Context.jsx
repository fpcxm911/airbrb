import React, { createContext } from 'react';

export const initialValue = {
  email: null,
  token: null,
  loggedIn: false,
};

export const Context = createContext(initialValue);
export const useContext = React.useContext;
