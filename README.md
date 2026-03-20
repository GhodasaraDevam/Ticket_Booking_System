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

## Frontend location (website code)

Your frontend website files are in:

- `src/`
- `public/`

Main frontend entry files:

- `src/index.js`
- `src/App.js`

## Step-by-step: first-time setup

### 1) Clone repository

```bash
git clone https://github.com/GhodasaraDevam/Ticket_Booking_System.git
cd Ticket_Booking_System
```

### 2) Install frontend dependencies (root)

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

### 5) Configure backend environment

Create your backend env file from example:

```bash
cd movie_backend
cp .env.example .env
```

Edit `movie_backend/.env` and set correct values:

```dotenv
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_real_mysql_password
DB_NAME=movie_booking
```

## Every time you want to run the project

### Terminal 1: Start backend

```bash
cd movie_backend
npm start
```

Backend URL: http://localhost:5000

### Terminal 2: Start frontend

```bash
cd ..
npm start
```

Frontend URL: http://localhost:3000

## Default Admin Rule

- Any signup with email `admin@movietickets.com` gets admin role.

## Troubleshooting

- If port 3000/5000 is busy, stop the process using that port and restart.
- If login/signup fails, verify MySQL is running and tables exist.
- If API calls fail, make sure backend is running before starting frontend.

### macOS: MySQL access denied (`ER_ACCESS_DENIED_ERROR`)

If you see access denied errors, your system may be using a different MySQL binary than Homebrew.

1. Check current MySQL binary:

```bash
which mysql
```

2. Put Homebrew MySQL first in PATH:

```bash
echo 'export PATH="/opt/homebrew/opt/mysql/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
which mysql
```

3. Reset MySQL root password:

```bash
brew services stop mysql
mysqld_safe --skip-grant-tables --skip-networking --datadir=/opt/homebrew/var/mysql &
mysql -u root
```

Then in MySQL shell:

```sql
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Devam@1234';
```

Exit and restart MySQL:

```bash
brew services start mysql
```

4. Ensure backend env file is set in `movie_backend/.env`:

```dotenv
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Devam@1234
DB_NAME=movie_booking
```

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
