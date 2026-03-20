import React, { createContext, useState } from "react";
import { movies } from "../data/movies";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [movieList, setMovieList] = useState(movies);

  const addMovie = (movie) => {
    setMovieList([...movieList, { ...movie, id: Date.now() }]);
  };

  const removeMovie = (id) => {
    setMovieList(movieList.filter((m) => m.id !== id));
  };

  return (
    <AdminContext.Provider value={{ movies: movieList, addMovie, removeMovie }}>
      {children}
    </AdminContext.Provider>
  );
};
