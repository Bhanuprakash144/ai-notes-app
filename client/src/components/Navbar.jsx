import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  if (location.pathname === "/") return null; // 👈 Hide on landing page

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/">AI Notes</Link>
      </div>
      <div>
        <button onClick={() => setDarkMode(!darkMode)} style={toggleBtnStyle}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
        <button onClick={handleLogout} style={logoutBtnStyle}>
          Logout
        </button>
      </div>
    </nav>
  );
}

// ...styles remain the same
