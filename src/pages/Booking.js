import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movies } from '../data/movies';
import './Booking.css';

const allSeats = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5'];

function Booking() {
  const { id } = useParams();
  const movie = movies.find(m => m.id === parseInt(id));
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const navigate = useNavigate();

  // Load already booked seats for the movie
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(`bookedSeats-${id}`)) || [];
    setBookedSeats(stored);
  }, [id]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  const confirmBooking = () => {
    if (!name || !email || !date || selectedSeats.length === 0) {
      alert('Please fill all fields and select at least one seat.');
      return;
    }

    const booking = {
      movieId: id,
      movieTitle: movie.title,
      date,
      seats: selectedSeats,
      name,
      email,
    };

    // Save to bookings list
    const prevBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    localStorage.setItem('bookings', JSON.stringify([...prevBookings, booking]));

    // Mark seats as booked
    const updated = [...bookedSeats, ...selectedSeats];
    localStorage.setItem(`bookedSeats-${id}`, JSON.stringify(updated));
    setBookedSeats(updated);

    navigate('/confirmation', { state: booking });
  };

  return (
    <div className="booking-page">
      <h2>Booking for {movie.title}</h2>

      <label>Select Date:</label>
      <input
        type="date"
        min={new Date().toISOString().split("T")[0]}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <div className="seating-grid">
        {allSeats.map((seat) => (
          <button
            key={seat}
            className={`seat ${bookedSeats.includes(seat) ? 'booked' : selectedSeats.includes(seat) ? 'selected' : ''}`}
            onClick={() => toggleSeat(seat)}
            disabled={bookedSeats.includes(seat)}
          >
            {seat}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={confirmBooking}>Confirm Booking</button>
    </div>
  );
}

export default Booking;
