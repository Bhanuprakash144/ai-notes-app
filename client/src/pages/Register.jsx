import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Pages.css';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    // Simulate successful registration
    if (name && email && password) {
      localStorage.setItem('token', 'sample_token');
      navigate('/dashboard');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button type="submit">Register</button>
      </form>

      <div className="form-extra">
        <p>
          Already have an account?{' '}
          <Link to="/login" className="register-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
