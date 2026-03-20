import React from 'react';
import './ContactUs.css';

export default function ContactUs() {
  return (
    <div className="contact-container" style={{ backgroundImage: 'url("/images/contact-bg.avif")' }}>
      <h2>Contact Us</h2>
      <form className="contact-form">
        <input placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Your message"></textarea>
        <button type="submit">Send Message</button>
      </form>
      <p>Support: support@movietickets.com</p>
    </div>
  );
}
