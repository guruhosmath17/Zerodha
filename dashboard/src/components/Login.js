import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (token) {
      axios
        .post(
          "https://zerodha-backend-go5a.onrender.com/set-token",
          {
            token,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log("Token saved:", response.data);

          localStorage.setItem("isLoggedIn", "true");

          // Remove token from URL
          window.history.replaceState(
            {},
            document.title,
            "/"
          );

          navigate("/");
        })
        .catch((error) => {
          console.log("Token error:", error);
        });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://zerodha-backend-go5a.onrender.com/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login response:", response.data);

      if (response.data.status) {
        localStorage.setItem("isLoggedIn", "true");

        navigate("/");
      }
    } catch (error) {
      console.log("Login error:", error);

      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="login-container">
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

        <button type="submit">
          Login
        </button>
      </form>

      <p>
        Don't have an account?{" "}
        <Link to="/signup">
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default Login;