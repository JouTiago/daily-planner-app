import { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // Get current month index (0 = January)

  // Function to generate the days of the month in a grid layout
  const generateDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div className="calendar-day" key={i} onClick={() => handleDayClick(i)}>
          {i}
        </div>
      );
    }

    return days;
  };

  // Function to handle day click
  const handleDayClick = (day: number) => {
    alert(`You clicked on day ${day}`);
  };

  // Function to change the month
  const changeMonth = (direction: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction);

    // Only allow navigation within the same year and not before the current month
    if (
      newDate.getFullYear() === currentYear &&
      (newDate.getMonth() >= currentMonth || direction > 0)
    ) {
      setCurrentDate(newDate);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        {currentDate.getMonth() > currentMonth && (
          <button onClick={() => changeMonth(-1)}>&lt; Prev</button>
        )}
        <h2>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h2>
        {currentDate.getMonth() < 11 && (
          <button onClick={() => changeMonth(1)}>Next &gt;</button>
        )}
      </div>
      <div className="calendar-grid">{generateDays()}</div>
    </div>
  );
};

export default Calendar;
