import React from 'react';
import { useLocation } from 'react-router-dom';
import './Confirmation.css';

function Confirmation() {
  const { state } = useLocation();

  return (
    <div className="confirmation-page">
      <h2>Booking Confirmed!</h2>
      <p><strong>Movie:</strong> {state.movieTitle}</p>
      <p><strong>Date:</strong> {state.date}</p>
      <p><strong>Seats:</strong> {state.seats.join(', ')}</p>
      <p><strong>Name:</strong> {state.name}</p>
      <p><strong>Email:</strong> {state.email}</p>
    </div>
  );
}

export default Confirmation;
