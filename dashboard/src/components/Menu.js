import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "../index.css";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const [cookies, removeCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://zerodha-backend-go5a.onrender.com/logout",
        {},
        {
          withCredentials: true,
        }
      );

      removeCookie("token", {
        path: "/",
      });

      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);

      removeCookie("token", {
        path: "/",
      });

      navigate("/login");
    }
  };

  return (
    <div className="menu-container">

      <Link to="/">
        <img
          src="logo.png"
          style={{ width: "50px" }}
          alt="Logo"
        />
      </Link>

      <div className="menus">

        <ul>

          <li>
            <Link
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              Orders
            </Link>
          </li>

          <li>
            <Link
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              Holdings
            </Link>
          </li>

          <li>
            <Link
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              Positions
            </Link>
          </li>

          <li>
            <Link
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              Funds
            </Link>
          </li>

          <li>
            <Link
              to="/apps"
              onClick={() => handleMenuClick(5)}
            >
              Apps
            </Link>
          </li>

        </ul>

        <span className="menu-divider"></span>

        <div className="auth-menu">

          {cookies.token ? (
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>

              <Link to="/signup" className="signup-btn">
                Signup
              </Link>
            </>
          )}

        </div>

      </div>

    </div>
  );
};

export default Menu;