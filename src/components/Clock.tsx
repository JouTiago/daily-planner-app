import { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="timer-container">
      <div className='timer-box'>
        <div className="timer-display">
          <div className="time-box">
            <h2>{String(time.getHours()).padStart(2, '0')}</h2>
            <p>HOURS</p>
          </div>
          <p className="dots">:</p>
          <div className="time-box">
            <h2>{String(time.getMinutes()).padStart(2, '0')}</h2>
            <p>MINUTES</p>
          </div>
          <p className="dots">:</p>
          <div className="time-box">
            <h2>{String(time.getSeconds()).padStart(2, '0')}</h2>
            <p>SECONDS</p>
          </div>
        </div>
        <div className="time-box">
          <h3>{String(time.getDate()).padStart(2, '0')}/{String(time.getMonth() + 1).padStart(2, '0')}</h3>
        </div>
      </div>
    </div>
  );
};

export default Timer;
