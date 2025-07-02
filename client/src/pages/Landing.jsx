import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="landing-title">🧠 AI Notes</h1>

      <motion.p
        className="landing-subtitle"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Your smart, cloud-based note-taking assistant. Powered by AI. Built by Bhanu.
      </motion.p>

      <motion.button
        className="landing-btn"
        onClick={() => navigate("/login")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        🚀 Get Started
      </motion.button>
    </div>
  );
}

export default Landing;
