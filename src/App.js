import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './pages/ScrollToTop';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Booking from './pages/Booking';
import Confirmation from './pages/Confirmation';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import './styles.css';
import AdminPanel from './pages/AdminPanel';
import { movies } from './data/movies';



function App() {
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, []);
  const location = useLocation();

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/book/:id" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        //<Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default App;
