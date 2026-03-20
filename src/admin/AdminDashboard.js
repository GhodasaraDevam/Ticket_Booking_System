import React from "react";
import AddMovieForm from "./AddMovieForm";
import MovieList from "./MovieList";

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AddMovieForm />
      <MovieList />
    </div>
  );
}
