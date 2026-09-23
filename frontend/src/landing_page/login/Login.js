import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://zerodha-backend-go5a.onrender.com/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login response:", response.data);

      if (response.data.status) {
        // Save login status locally
        localStorage.setItem("isLoggedIn", "true");

        // Redirect to dashboard
        window.location.href =
          "https://zerodha-dashboard-2pes.onrender.com/";
      } else {
        alert(response.data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        console.log("Server response:", error.response.data);

        alert(
          error.response.data.message ||
            "Invalid email or password"
        );
      } else {
        alert("Cannot connect to backend");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

        <p className="signup-link">
          Don't have an account?{" "}
          <Link to="/signup">Create Account</Link>
        </p>

        <p className="security-message">
          🔒 Your information is securely protected
        </p>

      </div>
    </div>
  );
};

export default Login;