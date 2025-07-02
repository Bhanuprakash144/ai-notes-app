import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Pages.css';

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="landing">
      <h2 data-aos="fade-down">Welcome to AI Notes 🧠</h2>
      <p data-aos="fade-up">
        Organize your thoughts, capture ideas, and manage tasks smartly with your personal AI-powered notepad.
      </p>

      <div data-aos="zoom-in" className="get-started">
        <button onClick={() => navigate('/login')}>Get Started</button>

        <p>
          Not registered?{' '}
          <Link to="/register" className="register-link">Register now</Link>
        </p>
      </div>

      <div className="landing-images" data-aos="fade-up">
        <img src="/dashboard-sample.png" alt="Dashboard Preview" />
        <img src="/edit-note-sample.png" alt="Edit Notepad" />
      </div>
    </div>
  );
};

export default Landing;
