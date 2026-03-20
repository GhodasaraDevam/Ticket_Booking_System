import React, { useState, useEffect } from 'react';
import { movies } from '../data/movies';
import './Home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const filtered = q.trim()
    ? movies.filter((movie) => {
      const query = q.trim().toLowerCase();
      const titleWords = movie.title.toLowerCase().split(/[\s:,-]+/);
      return titleWords.some((word) => word.startsWith(query));
    })
    : movies;

  const handleCardClick = (movieTitle) => {
    localStorage.setItem('selectedMovie', movieTitle);
    navigate('/movies');
  };

  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');
    const sections = document.querySelectorAll('.about-section, .contact-section');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach(el => observer.observe(el));
    sections.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
      sections.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero" style={{ backgroundImage: 'url("/images/bg-home.avif")' }}>
        <div className="search-container">
          <h1>Welcome to Movie Booking</h1>
          <input
            type="text"
            placeholder="Search for movies..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {/* Movie Cards Grid */}
      <div className="movie-grid">
        {filtered.length > 0 ? (
          filtered.map((m) => (
            <div
              key={m.id}
              className="card fade-in"
              onClick={() => handleCardClick(m.title)}
              style={{ cursor: 'pointer' }}
            >
              <img src={m.image} alt={m.title} />
              <div className="info">
                <h3>{m.title}</h3>
                <p>{m.genre}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>No matching movies found.</p>
        )}
      </div>

      {/* About Us Section */}
      <section id="about" className="about-section cream-bg">
        <h2>About Us</h2>
        <p>
          Welcome to our Movie Ticket Booking System! We are passionate about movies and strive to provide the best
          ticketing experience. Whether you're looking for the latest blockbusters or indie films, we've got you covered.
        </p>
        <p>
          Our platform offers fast, reliable, and secure bookings, so you never miss a show. Sit back, relax, and enjoy
          the show!
        </p>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="contact-section blue-bg">
        <h2>Contact Us</h2>
        <p>📧 Email: support@movietickets.com</p>
        <p>📞 Phone: +91-9876543210</p>
        <p>📍 Address: MovieBooking HQ, Mumbai, India</p>
      </section>
    </div>
  );
}






// import React, { useState, useRef, useEffect } from 'react';
// import { movies } from '../data/movies';
// import './Home.css';
// import { useNavigate } from 'react-router-dom';

// export default function Home() {
//   const navigate = useNavigate();
//   const [homeSearch, setHomeSearch] = useState('');


//   const filtered = movies.filter((m) =>
//     m.title.toLowerCase().startsWith(q.trim().toLowerCase()));
//   const handleSearch = () => {
//     if (homeSearch.trim()) {
//       navigate(`/movies?q=${encodeURIComponent(homeSearch)}`);
//     }
//   };

//   const handleCardClick = (movieTitle) => {
//     localStorage.setItem('selectedMovie', movieTitle);
//     navigate('/movies');
//   };

//   // Scroll animation on movie cards
//   useEffect(() => {
//     const elements = document.querySelectorAll('.fade-in');
//     const sections = document.querySelectorAll('.about-section, .contact-section');
//     const observer = new IntersectionObserver(
//       entries => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('visible');
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     elements.forEach(el => observer.observe(el));
//     sections.forEach(el => observer.observe(el));

//     return () => {
//       elements.forEach(el => observer.unobserve(el));
//       sections.forEach(el => observer.unobserve(el));
//     };
//   }, []);

//   return (
//     <div className="home-page">
//       {/* Hero Section - only this should have background image */}
//       <div className="hero" style={{ backgroundImage: 'url("/images/bg-home.avif")' }}>
//         <div className="search-container">
//           <h1>Welcome to Movie Booking</h1>
//           <input
//             type="text"
//             placeholder="Search for movies..."
//             value={q}
//             onChange={(e) => setQ(e.target.value)}
//           />
//           <button onClick={() => {
//             if (q.trim()) {
//               navigate(`/movies?q=${encodeURIComponent(q)}`);
//             }
//           }}>Search</button>

//         </div>
//       </div>

//       {/* Rest of the page - white background */}
//       <div className="movie-grid">
//         {filtered.map(m => (
//           <div key={m.id} className="card" onClick={() => handleCardClick(m.title)} style={{ cursor: 'pointer' }}>
//             <img src={m.image} alt={m.title} />
//             <div className="info">
//               <h3>{m.title}</h3>
//               <p>{m.genre}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* About and Contact sections stay same */}
//       {/* About Us Section */}
//       {/* About Us Section */}
//       <section id="about" className="about-section cream-bg">
//         <h2>About Us</h2>
//         <p>
//           Welcome to our Movie Ticket Booking System! We are passionate about movies and strive to provide the best
//           ticketing experience. Whether you're looking for the latest blockbusters or indie films, we've got you covered.
//         </p>
//         <p>
//           Our platform offers fast, reliable, and secure bookings, so you never miss a show. Sit back, relax, and enjoy
//           the show!
//         </p>
//       </section>

//       {/* Contact Us Section */}
//       <section id="contact" className="contact-section blue-bg">
//         <h2>Contact Us</h2>
//         <p>📧 Email: support@movietickets.com</p>
//         <p>📞 Phone: +91-9876543210</p>
//         <p>📍 Address: MovieBooking HQ, Mumbai, India</p>
//       </section>
//     </div>

//   );
// }
