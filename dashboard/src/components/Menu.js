import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./index.css";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const [cookies, removeCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  console.log("TOKEN IN MENU:", cookies.token);

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

    navigate("/login");
  } catch (error) {
    console.log("Logout error:", error);
    navigate("/login");
  }
};

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">

      {/* Logo */}
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
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p
                className={
                  selectedMenu === 0
                    ? activeMenuClass
                    : menuClass
                }
              >
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p
                className={
                  selectedMenu === 1
                    ? activeMenuClass
                    : menuClass
                }
              >
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p
                className={
                  selectedMenu === 2
                    ? activeMenuClass
                    : menuClass
                }
              >
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p
                className={
                  selectedMenu === 3
                    ? activeMenuClass
                    : menuClass
                }
              >
                Positions
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p
                className={
                  selectedMenu === 4
                    ? activeMenuClass
                    : menuClass
                }
              >
                Funds
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p
                className={
                  selectedMenu === 6
                    ? activeMenuClass
                    : menuClass
                }
              >
                Apps
              </p>
            </Link>
          </li>

        </ul>

        <hr />

        {/* Authentication */}
     <span className="menu-divider"></span>

<div className="auth-menu">
  <button
    className="logout-btn"
    onClick={handleLogout}
  >
    Logout
  </button>
</div>


      </div>
    </div>
  );
};

export default Menu;