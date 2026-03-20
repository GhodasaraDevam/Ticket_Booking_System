import React from 'react';
import './SeatSelector.css';

function SeatSelector({ selectedSeats, onSelect }) {
  const seats = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="seats-grid">
      {seats.map((seat) => (
        <button
          key={seat}
          className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
          onClick={() => onSelect(seat)}
        >
          {seat}
        </button>
      ))}
    </div>
  );
}

export default SeatSelector;
