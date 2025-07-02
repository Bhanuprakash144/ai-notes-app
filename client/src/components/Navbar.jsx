import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Components.css';

const Navbar = ({ darkMode, setDarkMode }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>🧠 AI Notes</h1>

      <div>
        {token ? (
          <button onClick={handleLogout}>🚪 Logout</button>
        ) : (
          location.pathname === '/' && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )
        )}

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
