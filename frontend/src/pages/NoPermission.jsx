import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NoPermission = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, []);

  const handleClick = () => {
    navigate('/');
  }
  return (
    <div>
      <p>You do not have permission to visit this page.</p>
      <p>You will be redirected to the homepage.</p>
      <p>If you are not redirected, please click the button below.</p>
      <button onClick={handleClick}>Go to Home</button>
    </div>
  );
};

export default NoPermission;
