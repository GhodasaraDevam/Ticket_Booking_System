import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";

export default function AddMovieForm() {
  const { addMovie } = useContext(AdminContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie({ title, image, description, duration });
    setTitle(""); setImage(""); setDescription(""); setDuration("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="/images/yourmovie.jpg" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration" />
      <button type="submit">Add Movie</button>
    </form>
  );
}
