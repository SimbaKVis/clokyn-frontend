import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate('/users')}>Users</button>
      <button onClick={() => navigate('/shifts')}>Shifts</button>
      <button onClick={() => navigate('/requests')}>Requests</button>
    </>
  );
};

export default NavigationButtons;