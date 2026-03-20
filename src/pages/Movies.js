import React, { useState, useEffect } from 'react';
//import { movies } from '../data/movies';
import axios from 'axios';
import './Movies.css';
//import { useLocation } from 'react-router-dom';

const getYouTubeVideoId = (url) => {
  const match = url.match(/(?:youtube\.com.*(?:\\?|&)v=|youtu\.be\/)([^&#?/]+)/);
  return match ? match[1] : null;
};

export default function Movies() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerMovie, setTrailerMovie] = useState(null);

  //const [q, setQ] = useState('');
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    setMovies(storedMovies);
  }, []);

  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const defaultQuery = params.get('q') || '';
  const [q, setQ] = useState('');
  // const [selectedDate, setSelectedDate] = useState('');
  // const [selectedTime, setSelectedTime] = useState('');
  // const [selectedSeat, setSelectedSeat] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    personCount: 1,
    seats: [],
  });
  const [bookedSeats, setBookedSeats] = useState([]);

  // Handle seat selection
  const toggleSeat = (seat) => {
    setFormData((prev) => {
      const isSelected = prev.seats.includes(seat);

      // Remove seat if already selected
      if (isSelected) {
        return { ...prev, seats: prev.seats.filter((s) => s !== seat) };
      }

      // Do nothing if seat count already reached
      if (prev.seats.length >= prev.personCount) {
        alert(`❗ You can select only ${prev.personCount} seat(s).`);
        return prev;
      }

      // Add seat
      return { ...prev, seats: [...prev.seats, seat] };
    });
  };

  // Modal close and reset data
  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const username = loggedUser?.name;
    const email = loggedUser?.email;
    setFormData({
      name: loggedUser?.name || '',
      email: loggedUser?.email || '',
      date: '',
      time: '',
      personCount: 1,
      seats: [],
    });
    setBookedSeats([]);
  };

  // Fetch booked seats based on movie/date/time
  const fetchBookedSeats = () => {
    if (selectedMovie && formData.date && formData.time) {
      axios.post('http://localhost:5000/api/booked-seats', {
        movie: selectedMovie.title,
        date: formData.date,
        time: formData.time,
      })
        .then((res) => {
          // Direct array expected
          setBookedSeats(res.data || []);
        })
        .catch((err) => {
          console.error("Error fetching booked seats:", err);
          setBookedSeats([]);
        });
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      if (showModal && selectedMovie && formData.date && formData.time) {
        fetchBookedSeats();
      }
    }, 2000); // Refresh every 2 seconds

    return () => clearInterval(interval); // Cleanup on modal close or unmount
  }, [showModal, selectedMovie, formData.date, formData.time]);


  // Handle booking submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedUser = JSON.parse(localStorage.getItem('user'));

    if (
      !loggedUser ||
      loggedUser.name.trim().toLowerCase() !== formData.name.trim().toLowerCase() ||
      loggedUser.email.trim().toLowerCase() !== formData.email.trim().toLowerCase()
    ) {
      alert("❌ Name and Email must match your logged-in credentials.");
      return;
    }

    if (!formData.date || !formData.time) {
      alert("❗ Please select date and time.");
      return;
    }

    const personCount = parseInt(formData.personCount);
    if (formData.seats.length < personCount) {
      alert(`❗ You must select exactly ${personCount} seat(s).`);
      return;
    }

    axios.post('http://localhost:5000/api/book', {
      movie: selectedMovie.title,
      date: formData.date,
      time: formData.time,
      seat: formData.seats.join(','),
      username: formData.name,
      email: formData.email.trim().toLowerCase()
    })
      .then(res => {
        alert('Booking successful!');
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
        alert('❌ Booking failed. Try again.');
      });


  };

  // Render seat buttons
  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= 30; i++) {
      const isSelected = formData.seats.includes(i);
      const isBooked = bookedSeats.includes(i);
      const canSelect = isSelected || formData.seats.length < formData.personCount;

      seats.push(
        <button
          key={i}
          type="button"
          className={`seat ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
          onClick={() => toggleSeat(i)}
          disabled={isBooked || !canSelect}
        >
          {i}
        </button>
      );
    }
    return <div className="seat-layout">{seats}</div>;
  };

  let filteredMovies = movies;
  const query = q.trim().toLowerCase();

  if (query) {
    const startsWithMatches = movies.filter((movie) => {
      const titleWords = movie.title.toLowerCase().split(/[\s:,-]+/);
      return titleWords.some(word => word.startsWith(query));
    });

    filteredMovies = startsWithMatches.length > 0
      ? startsWithMatches
      : movies.filter((movie) =>
        movie.title.toLowerCase().includes(query)
      );
  }
  console.log("Search:", q, "→", filteredMovies.map(m => m.title));

  const handleShowTrailer = (movie) => {
    setTrailerMovie(movie);
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
    setTrailerMovie(null);
  };

  return (
    <div className="movies-page" style={{ backgroundImage: "url('/images/bg-movies.avif')" }}>
      <h1>Now Showing</h1>
      <input
        type="text"
        placeholder="Search movies..."
        className="movie-search"
        value={q}
        onChange={(e) => {
          setQ(e.target.value); // THIS IS MANDATORY
        }}
      />

      <div className="movie-list">
        {filteredMovies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card fade-in">
              <img src={movie.image} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p className="genre">{movie.genre}</p>
              <p className="description">{movie.description}</p>
              <div className="movie-card-buttons">
                <button
                  className="movie-button"
                  onClick={() => {
                    const loggedUser = JSON.parse(localStorage.getItem('user'));
                    setFormData({
                      name: loggedUser?.name || '',
                      email: loggedUser?.email || '',
                      date: '',
                      time: '',
                      personCount: 1,
                      seats: [],
                    });
                    setSelectedMovie(movie);
                    setBookedSeats([]);
                    setShowModal(true);
                  }}
                >
                  Book Now
                </button>
                <button
                  className="movie-button"
                  onClick={() => handleShowTrailer(movie)}
                >
                  🎬 Trailer
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && selectedMovie && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn" onClick={closeModal}>
              ✖
            </button>
            <h2>Book for {selectedMovie.title}</h2>
            <form onSubmit={handleSubmit}>
  <div className="booking-form-container">
    <input
      type="text"
      placeholder="Your Name"
      value={formData.name}
      readOnly
    />
    <input
      type="email"
      placeholder="Your Email"
      value={formData.email}
      readOnly
    />
    <input
      type="date"
      value={formData.date}
      min={new Date().toISOString().split("T")[0]}
      required
      onChange={(e) => {
        const date = e.target.value;
        setFormData(prev => {
          const updated = { ...prev, date };
          if (selectedMovie && updated.time) {
            setTimeout(() => fetchBookedSeats(), 100);
          }
          return updated;
        });
      }}
    />
    <select
      value={formData.time}
      onChange={(e) => {
        const time = e.target.value;
        setFormData(prev => {
          const updated = { ...prev, time };
          if (selectedMovie && updated.date) {
            setTimeout(() => fetchBookedSeats(), 100);
          }
          return updated;
        });
      }}
      required
    >
      <option value="" disabled>
        Select time
      </option>
      {[
        { value: '10:00', label: '10:00 AM' },
        { value: '14:00', label: '2:00 PM' },
        { value: '18:00', label: '6:00 PM' },
        { value: '21:00', label: '9:00 PM' },
      ].map(({ value, label }) => {
        const now = new Date();
        const today = new Date().toISOString().split("T")[0];
        const isToday = formData.date === today;
        const timeDate = new Date(`${formData.date}T${value}`);
        const isPast = isToday && timeDate <= now;

        return (
          <option key={value} value={value} disabled={isPast}>
            {label} {isPast ? '(Unavailable)' : ''}
          </option>
        );
      })}
    </select>

    <input
      type="number"
      min="1"
      max={30 - bookedSeats.length}
      placeholder="No. of Persons"
      value={formData.personCount}
      required
      onChange={(e) => {
        const value = parseInt(e.target.value) || 1;
        const availableSeats = 30 - bookedSeats.length;

        if (value > availableSeats) {
          alert(`❗ Only ${availableSeats} seat(s) are available.`);
          return;
        }

        setFormData({
          ...formData,
          personCount: value,
          seats: [],
        });
      }}
    />

    {renderSeats()}

    <button type="submit" className="mt-2 px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700">
      Confirm Booking
    </button>
  </div>
</form>

          </div>
        </div>
      )}
      {showTrailer && trailerMovie && (
        <div className="trailer-modal">
          <div className="trailer-content">
            <span className="close-btn" onClick={handleCloseTrailer}>
              &times;
            </span>

            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(trailerMovie.trailer)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <h2>{trailerMovie.title} - Trailer</h2>
          </div>
        </div>
      )}

    </div>
  );
}
