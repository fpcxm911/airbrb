import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PageList from './pages/PageList';

function App () {
  return (
    <BrowserRouter>
      <PageList />
    </BrowserRouter>
  );
}

export default App;
