import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import axios from 'axios';

export default function AdminPanel() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('movies')) || [];
    setMovies(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewMovie({ ...newMovie, image: reader.result }); // 👈 base64 image
    };
    reader.readAsDataURL(file);
  };

  const addMovie = () => {
    const updated = [...movies, newMovie];
    setMovies(updated);
    localStorage.setItem('movies', JSON.stringify(updated));
    setNewMovie({ title: '', genre: '', description: '', image: '' });
  };

  const deleteMovie = (index) => {
    const updated = movies.filter((_, i) => i !== index);
    setMovies(updated);
    localStorage.setItem('movies', JSON.stringify(updated));
  };

const handleAddMovie = () => {
  if (!newMovie.title || !newMovie.description || !newMovie.image) {
    alert("All fields are required.");
    return;
  }

  axios.post('http://localhost:5000/api/add-movie', newMovie)
    .then((res) => {
      alert("Movie added successfully!");
      setNewMovie({ title: '', description: '', image: '' });
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to add movie.");
    });
};


  return (
    <div className="admin-container">
      <h2>🎬 Admin Movie Manager</h2>

      <div className="form-box">
        <input type="text" name="title" placeholder="Title" value={newMovie.title} onChange={handleChange} />
        <input type="text" name="genre" placeholder="Genre" value={newMovie.genre} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={newMovie.description} onChange={handleChange}></textarea>
        
        {/* 👇 File input for local image */}
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <button onClick={addMovie}>Add Movie</button>
      </div>

      <div className="movie-grid">
        {movies.map((movie, index) => (
          <div className="movie-card" key={index}>
            <img src={movie.image} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p><b>{movie.genre}</b></p>
            <p>{movie.description}</p>
            <button className="delete-btn" onClick={() => deleteMovie(index)}>❌ Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
