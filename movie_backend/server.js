// server.js (Backend only)
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000', // ✅ Only allow your React frontend
  credentials: true
}));
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Devam@1234',
  database: 'movie_booking',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(401).send('Invalid credentials');

    const user = results[0];
    if (user.password === password) {
      res.json({
        success: true,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// Signup route
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;

  const role = email === 'admin@movietickets.com' ? 'admin' : 'user';

  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) return res.status(500).send('Server error');

    if (results.length > 0) {
      return res.status(400).send('Email already registered');
    }

    const insertQuery = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [name, email, password, role], (err) => {
      if (err) return res.status(500).send('Error creating user');

      res.status(201).json({ success: true, name, email, role });
    });
  });
});

// Book tickets
app.post('/api/book', (req, res) => {
  const { movie, date, time, seat, username, email } = req.body;

  if (!movie || !date || !time || !seat || !username || !email) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const sql = "INSERT INTO bookings (movie, date, time, seat, username, email) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [movie, date, time, seat, username, email], (err) => {
    if (err) {
      console.error("Insert error: ", err);
      return res.status(500).json({ error: 'Database error' });
    }
    return res.status(200).json({ message: 'Booking successful' });
  });
});

// Fetch user bookings
app.post('/api/user-bookings', (req, res) => {
  const { email } = req.body;
  const sql = 'SELECT * FROM bookings WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Error fetching user bookings:", err);
      return res.status(500).send('Error');
    }
    res.json(result);
  });
});

// Cancel booking
app.delete('/api/cancel-booking/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM bookings WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) {
      console.error('Error deleting booking:', err);
      return res.status(500).json({ success: false, message: 'Failed to cancel booking.' });
    }
    return res.status(200).json({ success: true });
  });
});

// Fetch booked seats
// app.post('/api/booked-seats', (req, res) => {
//   const { movie, date, time } = req.body;
//   const query = `
//     SELECT seat FROM bookings
//     WHERE movie = ? AND date = ? AND time = ?
//   `;
//   db.query(query, [movie, date, time], (err, results) => {
//     if (err) {
//       console.error('Error fetching booked seats:', err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//     const bookedSeats = results.map(row => row.seat);
//     res.json(bookedSeats);
//   });
// });
app.post('/api/booked-seats', (req, res) => {
  const { movie, date, time } = req.body;
  const sql = 'SELECT seat FROM bookings WHERE movie = ? AND date = ? AND time = ?';
  db.query(sql, [movie, date, time], (err, results) => {
    if (err) return res.status(500).send(err);
    const allSeats = results.flatMap(row => row.seat?.split(',') || []);
    res.json([...new Set(allSeats.map(s => s.trim()))]); // Return unique seat list
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
