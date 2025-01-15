import React from 'react';

// Helper function to format the date as '30 Jan, Mon'
const formatDate = (date) => {
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  return date.toLocaleDateString('en-GB', options); // 'en-GB' formats as Day Month (e.g., 30 Jan, Mon)
};

// Helper function to create an array of time slots (00:00 to 23:00)
const createTimeSlots = () => {
  const timeSlots = [];
  for (let hour = 0; hour < 24; hour++) {
    const time = `${hour < 10 ? '0' : ''}${hour}:00`; // Format the hour as 00:00, 01:00, ..., 23:00
    timeSlots.push(time);
  }
  return timeSlots;
};

const Calendar = ({ startOfWeek }) => {
  // Function to get the dates for the current week
  const getWeekDates = (startOfWeek) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i); // Add i days to get the corresponding day of the week
      dates.push(formatDate(day)); // Format and add it to the array
    }
    return dates;
  };

  const weekDates = getWeekDates(startOfWeek);
  const timeSlots = createTimeSlots(); // Create the time slots (00:00 to 23:00)

  return (
    <div className="calendar">
      <div className="week-header">
        {/* Render the days of the week */}
        <div className="time-column"></div> {/* Empty cell for time column */}
        {weekDates.map((date, index) => (
          <div className="day" key={index}>
            {date}
          </div>
        ))}
      </div>
      <div className="week-body">
        {/* Render the time slots */}
        {timeSlots.map((time, index) => (
          <div className="time-row" key={index}>
            <div className="time">{time}</div> {/* Time column */}
            {/* Render the empty cells for each day */}
            {weekDates.map((_, i) => (
              <div className="day-column" key={i}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
