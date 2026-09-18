import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;

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
        "http://localhost:3002/signup",
        inputValue,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success(data.message);

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Signup error:", error);

      if (error.response) {
        toast.error(
          error.response.data.message || "Signup failed"
        );
      } else {
        toast.error("Cannot connect to backend");
      }
    }

    setInputValue({
      email: "",
      password: "",
      username: "",
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

          <h2>Create Account</h2>

          <p className="auth-subtitle">
            Create your account to start trading
          </p>

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

            {/* Username */}
            <div className="input-group">
              <label>Username</label>

              <div className="input-wrapper">
                <span className="input-icon">
                  👤
                </span>

                <input
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Enter your username"
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
              Create Account
            </button>

          </form>

          <div className="auth-footer">
            Already have an account?{" "}
            <Link to="/login">
              Login
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

export default Signup;