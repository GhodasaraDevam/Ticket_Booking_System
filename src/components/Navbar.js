import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  { user?.role === 'admin' && <NavLink to="/admin">Admin Panel</NavLink> }

  const logout = () => {
    localStorage.removeItem('user');
    setOpen(false);
    navigate('/');
    window.scrollTo(0, 0);
  };

  const scrollToSection = (selector) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(selector);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePageNav = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo" onClick={() => handlePageNav('/')}>🎬 BookMyShow</Link>
      </div>

      <div className="navbar-center">
        <button className="nav-button" onClick={() => handlePageNav('/')}>Home</button>
        <button className="nav-button" onClick={() => scrollToSection('.about-section')}>About Us</button>
        <button className="nav-button" onClick={() => scrollToSection('.contact-section')}>Contact Us</button>
        <button className="nav-button" onClick={() => handlePageNav('/movies')}>Movies</button>

        {user && (
          <button className="nav-button" onClick={() => handlePageNav('/mybookings')}>My Bookings</button>
        )}

        {user?.role === 'admin' && (
          <button className="nav-button" onClick={() => handlePageNav('/admin')}>Admin Panel</button>
        )}
      </div>

      <div className="navbar-right">
        {user ? (
          <div className="profile-container">
            <span className="profile-btn" onClick={() => setOpen(!open)}>{user.name}</span>
            {open && (
              <div className="profile-dropdown">
                <p><strong>{user.name}</strong></p>
                <p>{user.email}</p>
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={() => handlePageNav('/login')}>Login / Signup</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
