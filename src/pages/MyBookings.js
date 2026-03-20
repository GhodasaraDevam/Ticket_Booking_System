import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyBookings.css';

function formatTime(timeStr) {
  const [hour, minute] = timeStr.split(':');
  const date = new Date();
  date.setHours(+hour);
  date.setMinutes(+minute);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user?.email?.trim().toLowerCase();

  useEffect(() => {
    if (!email) {
      console.warn("No logged in user found.");
      return;
    }

    // Fetch bookings for current user
    axios.post('http://localhost:5000/api/user-bookings', { email })
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user bookings:", err);
      });
  }, [email]);

  const handleCancel = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/cancel-booking/${id}`);
      if (res.data.success) {
        alert('Booking cancelled successfully');
        // Refresh bookings after cancellation
        const refreshed = await axios.post('http://localhost:5000/api/user-bookings', { email });
        setBookings(refreshed.data);
      } else {
        alert('Failed to cancel booking.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to cancel booking.');
    }
  };

  return (
    <div className="my-bookings-page">
      <h1>🎟️ My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((b) => (
            <div key={b.id || b.booking_id} className="booking-card fade-in">
              <h2>{b.movie}</h2>
              <p><strong>Name:</strong> {b.username}</p>
              <p><strong>Email:</strong> {b.email}</p>
              <p><strong>Date:</strong> {new Date(b.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {formatTime(b.time)}</p>
              <p><strong>Seats:</strong> {b.seat ? b.seat.split(',').map(s => s.trim()).join(', ') : ''}</p>
              <button onClick={() => handleCancel(b.id || b.booking_id)}>Cancel Booking</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
