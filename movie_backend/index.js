const express = require('express');
const cors = require('cors');
const db = require('./db');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🎟️ Create booking
app.post('/api/book', (req, res) => {
    const { name, email, movieId, date, time, seats } = req.body;

    console.log("Booking Request Received:", req.body); // Log request

    const insertUser = `INSERT INTO users (name, email) VALUES (?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name)`;
    db.query(insertUser, [name, email], (err) => {
        if (err) {
            console.error("Insert User Error:", err);
            return res.status(500).send(err);
        }

        db.query(`SELECT id FROM users WHERE email=?`, [email], (err, userResult) => {
            if (err) {
                console.error("Select User Error:", err);
                return res.status(500).send(err);
            }

            if (!userResult || userResult.length === 0) {
                console.error("User not found after insert.");
                return res.status(500).send({ error: "User not found" });
            }

            const userId = userResult[0].id;
            const insertBooking = `INSERT INTO bookings (movie_id, user_id, date, time, seats) VALUES (?, ?, ?, ?, ?)`;
            db.query(insertBooking, [movieId, userId, date, time, JSON.stringify(seats)], (err) => {
                if (err) {
                    console.error('Booking insert error:', err);  // Add this
                    return res.status(500).send(err);
                }
                if (!userResult || userResult.length === 0) {
                    return res.status(404).send({ message: "User not found." });
                }

                const userId = userResult[0].id;
                res.send({ message: 'Booking saved to DB!' });
            });
        });
    });
});

// 🪑 Get booked seats for movie + date + time
app.get('/api/booked-seats', (req, res) => {
    const { movieId, date, time } = req.query;
    db.query(`SELECT seats FROM bookings WHERE movie_id=? AND date=? AND time=?`, [movieId, date, time], (err, results) => {
        if (err) return res.status(500).send(err);

        const allSeats = results.flatMap(r => JSON.parse(r.seats));
        res.send(allSeats);
    });
});

// 📜 All user bookings
app.get('/api/user-bookings', (req, res) => {
    const { email } = req.query;
    console.log("🔍 Fetching bookings for:", email);  // <-- Add this

    db.query(`
    SELECT b.id, b.date, b.time, b.seats, 
           m.title AS movieTitle,
           u.name 
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN movies m ON b.movie_id = m.id
    WHERE u.email = ?
    ORDER BY b.date DESC
  `, [email], (err, results) => {
        if (err) {
            console.error("❌ DB Error:", err);
            return res.status(500).send(err);
        }

        console.log("✅ Bookings found:", results);  // <-- Add this
        res.send(results);
    });
});

// ❌ Cancel a booking
app.delete('/api/cancel-booking/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM bookings WHERE id=?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Booking cancelled.' });
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));
