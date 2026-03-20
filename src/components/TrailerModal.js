// src/components/TrailerModal.js
import React from "react";
import "./TrailerModal.css";

const TrailerModal = ({ trailerUrl, onClose }) => {
  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <iframe
          width="100%"
          height="400px"
          src={getEmbedUrl(trailerUrl)}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Trailer"
        ></iframe>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TrailerModal;
