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
  } catch (error) {
    console.log("Logout error:", error);
  }

  localStorage.removeItem("isLoggedIn");

  navigate("/login");
};

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Orders", path: "/orders" },
    { name: "Holdings", path: "/holdings" },
    { name: "Positions", path: "/positions" },
    { name: "Funds", path: "/funds" },
    { name: "Apps", path: "/apps" },
  ];

  return (
    <div className="menu-container">

      {/* LOGO */}
      <div className="logo-container">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Zerodha"
            className="logo-img"
          />
        </Link>
      </div>

      {/* MENU */}
      <div className="menus">
        <ul>
          {menuItems.map((item, index) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={
                  selectedMenu === index
                    ? "menu-link active"
                    : "menu-link"
                }
                onClick={() => handleMenuClick(index)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* DIVIDER */}
      <div className="menu-divider"></div>

      {/* LOGOUT */}
      <div className="auth-menu">
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default Menu;