import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoPermission = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }
  return (
    <div>
      <p>You do not have permission to visit this page.</p>
      <p>If you are not redirected, please click the button below which redirected to the homepage.</p>
      <button onClick={handleClick}>Go to Home</button>
    </div>
  );
};

export default NoPermission;
