import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './Calendar';
import Login from './components/Login';
import Users from './components/Users';
import Shifts from './components/Shifts';
import Requests from './components/Requests';
import NavigationButtons from './components/NavigationButtons';  // New Component for navigation

const App = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

  // Calculate start and end of the week
  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const startOfWeek = new Date(date.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  };

  const getEndOfWeek = (startOfWeek) => {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return endOfWeek;
  };

  const startOfWeek = getStartOfWeek(currentWeek);
  const endOfWeek = getEndOfWeek(startOfWeek);

  const goToPreviousWeek = () => {
    const prevWeek = new Date(startOfWeek);
    prevWeek.setDate(startOfWeek.getDate() - 7);
    setCurrentWeek(prevWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(startOfWeek);
    nextWeek.setDate(startOfWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
  };

  return (
    <Router>
      <div id="app-container">
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/shifts" element={<Shifts />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/" element={isLoggedIn ? (
            <>
              <div id="header">
                <h1>My schedule</h1>
                <div className="button-container">
                  <button onClick={goToPreviousWeek}>Last Week</button>
                  <button onClick={goToNextWeek}>Next Week</button>
                  <button className="date-range-button">{`${startOfWeek.toLocaleDateString()} – ${endOfWeek.toLocaleDateString()}`}</button>
                  <button onClick={goToToday}>Today</button>
                  <NavigationButtons />  {/* Navigation buttons are now in a separate component */}
                </div>
              </div>
              <div id="main-container">
                <div id="left-panel">
                  <h3>Explorer Panel</h3>
                </div>
                <div id="calendar">
                  <Calendar startOfWeek={startOfWeek} />
                </div>
              </div>
            </>
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

