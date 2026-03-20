import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/signup', form);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/');
    } catch (err) {
      alert(err.response?.data || 'Signup failed');
    }
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/login', {
      email: form.email,
      password: form.password
    });

    const userData = res.data;
    localStorage.setItem('user', JSON.stringify(userData));

    // Redirect based on role
    if (userData.role === 'admin') {
      navigate('/admin-panel');
    } else {
      navigate('/');
    }

  } catch (err) {
    alert(err.response?.data || 'Login failed');
  }
};


  return (
    <div className="login-container">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

      {isSignup && (
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      )}

      <input
        type="email"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />

      <button onClick={isSignup ? handleSignup : handleLogin}>
        {isSignup ? 'Sign Up' : 'Login'}
      </button>

      <p>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <span className="toggle" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Login' : 'Sign Up'}
        </span>
      </p>
    </div>
  );
};

export default LoginPage;




// import React, { useState } from 'react';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [isSignup, setIsSignup] = useState(true);
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSignup = () => {
//     const users = JSON.parse(localStorage.getItem('users')) || [];

//     if (users.some(user => user.email === form.email)) {
//       alert('Email already registered');
//       return;
//     }

//     users.push({ name: form.name, email: form.email, password: form.password });
//     localStorage.setItem('users', JSON.stringify(users));
//     localStorage.setItem('user', JSON.stringify({ name: form.name, email: form.email }));
//     navigate('/');
//   };

//   const handleLogin = () => {
//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     const found = users.find(user => user.email === form.email && user.password === form.password);
//     if (found) {
//       localStorage.setItem('user', JSON.stringify(found));
//       navigate('/');
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
//       {isSignup && (
//         <input
//           type="text"
//           placeholder="Name"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//         />
//       )}
//       <input
//         type="email"
//         placeholder="Email"
//         name="email"
//         value={form.email}
//         onChange={handleChange}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         name="password"
//         value={form.password}
//         onChange={handleChange}
//       />
//       <button onClick={isSignup ? handleSignup : handleLogin}>
//         {isSignup ? 'Sign Up' : 'Login'}
//       </button>

//       <p>
//         {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
//         <span className="toggle" onClick={() => setIsSignup(!isSignup)}>
//           {isSignup ? 'Login' : 'Sign Up'}
//         </span>
//       </p>
//     </div>
//   );
// };

// export default LoginPage;
