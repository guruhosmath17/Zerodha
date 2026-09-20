import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://zerodha-backend-go5a.onrender.com/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login response:", data);

      if (data.success) {
  toast.success(data.message);

  localStorage.setItem("isLoggedIn", "true");

  setTimeout(() => {
    window.location.href = "/";
  }, 1000);
}

    } catch (error) {
      console.log("Login error:", error);

      if (error.response) {
        toast.error(
          error.response.data.message || "Login failed"
        );
      } else {
        toast.error("Cannot connect to backend");
      }
    }

    setInputValue({
      email: "",
      password: "",
    });
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        <div className="auth-card">

          {/* Logo */}
          <div className="auth-logo">
            <span>Z</span>
          </div>

          <h2>Log In </h2>

          {/* <p className="auth-subtitle">
            Login to access your trading account
          </p> */}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* Email */}
            <div className="input-group">

              <label>Email Address</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={handleOnChange}
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div className="input-group">

              <label>Password</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={handleOnChange}
                  required
                />

              </div>

            </div>

            <button
              type="submit"
              className="auth-button"
            >
              Login
            </button>

          </form>

          <div className="auth-footer">
            Don't have an account?{" "}
            <Link to="/signup">
              Create Account
            </Link>
          </div>

          <div className="auth-security">
            🔒 Your information is securely protected
          </div>

        </div>

      </div>

      <ToastContainer />

    </div>
  );
};

export default Login;