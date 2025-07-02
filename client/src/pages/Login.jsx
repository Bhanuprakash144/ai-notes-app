import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Pages.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate login success
    if (email && password) {
      localStorage.setItem('token', 'sample_token');
      navigate('/dashboard');
    } else {
      alert('Please enter both email and password.');
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <div className="form-extra">
        <Link to="#">Forgot Password?</Link>
        <p>
          Not registered? <Link to="/register" className="register-link">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
