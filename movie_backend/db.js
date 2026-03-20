const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // your MySQL username
  password: 'Devam@1234',         // your MySQL password (keep empty if no password)
  database: 'movie_booking'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
