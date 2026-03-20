import React from 'react';
import './DateSelector.css';

function DateSelector({ date, setDate }) {
  return (
    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
  );
}

export default DateSelector;
