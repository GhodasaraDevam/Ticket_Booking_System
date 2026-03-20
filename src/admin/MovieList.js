import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

export default function MovieList() {
  const { movies, removeMovie } = useContext(AdminContext);

  return (
    <div>
      <h2>Movies</h2>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h4>{movie.title}</h4>
          <button onClick={() => removeMovie(movie.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
