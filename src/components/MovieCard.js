// src/components/MovieCard.js
import React, { useState } from "react";
import TrailerModal from "./TrailerModal";
import "./MovieCard.css";

const MovieCard = ({ movie, onBook }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.title} className="movie-image" />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.genre}</p>
        <p>{movie.description}</p>
        <p>Duration: {movie.duration}</p>
        <div className="movie-buttons">
          <button className="book-button" onClick={() => onBook(movie)}>
            Book Now
          </button>
          <button
            className="trailer-button"
            onClick={() => setShowTrailer(true)}
          >
            Watch Trailer
          </button>
        </div>
      </div>

      {showTrailer && (
        <TrailerModal
          trailerUrl={movie.trailer}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
};

export default MovieCard;
