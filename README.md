# Ticket_Booking_System

## Project Overview

This is a full-stack movie ticket booking system:

- Frontend: React (runs on port 3000)
- Backend: Node.js + Express (runs on port 5000)
- Database: MySQL (`movie_booking`)

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MySQL Server (running locally)

## Step-by-step: How to run the project

### 1) Clone repository

```bash
git clone https://github.com/GhodasaraDevam/Ticket_Booking_System.git
cd Ticket_Booking_System
```

### 2) Install frontend dependencies

```bash
npm install
```

### 3) Install backend dependencies

```bash
cd movie_backend
npm install
cd ..
```

### 4) Create MySQL database and tables

Run this SQL in MySQL:

```sql
CREATE DATABASE IF NOT EXISTS movie_booking;
USE movie_booking;

CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(150) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	role VARCHAR(20) DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS bookings (
	id INT AUTO_INCREMENT PRIMARY KEY,
	movie VARCHAR(255) NOT NULL,
	date VARCHAR(50) NOT NULL,
	time VARCHAR(50) NOT NULL,
	seat VARCHAR(255) NOT NULL,
	username VARCHAR(100) NOT NULL,
	email VARCHAR(150) NOT NULL
);
```

### 5) Configure DB credentials

Update MySQL credentials in backend files:

- `movie_backend/server.js`
- `movie_backend/db.js`

Set these values according to your local MySQL setup:

- `host`
- `user`
- `password`
- `database`

### 6) Start backend server

```bash
cd movie_backend
npm start
```

Backend URL: http://localhost:5000

### 7) Start frontend app (new terminal)

```bash
cd Ticket_Booking_System
npm start
```

Frontend URL: http://localhost:3000

## Default Admin Rule

- Any signup with email `admin@movietickets.com` gets admin role.

## Troubleshooting

- If port 3000/5000 is busy, stop the process using that port and restart.
- If login/signup fails, verify MySQL is running and tables exist.
- If API calls fail, make sure backend is running before starting frontend.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Unnecessary / Local files

These files or folders are local/environment-specific and should not be committed to GitHub:

- node_modules/
- movie_backend/node_modules/
- .DS_Store
- .zencoder/
- .zenflow/
