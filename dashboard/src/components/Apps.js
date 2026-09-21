import React from "react";
import { Link } from "react-router-dom";

const Apps = () => {
  const apps = [
    {
      name: "Dashboard",
      description: "View your portfolio summary",
      path: "/",
    },
    {
      name: "Orders",
      description: "Place and manage your orders",
      path: "/orders",
    },
    {
      name: "Holdings",
      description: "View your investment holdings",
      path: "/holdings",
    },
    {
      name: "Positions",
      description: "View your active positions",
      path: "/positions",
    },
    {
      name: "Funds",
      description: "Check your available funds",
      path: "/funds",
    },
  ];

  return (
    <>
      <h3 className="title">Apps</h3>

      <div className="apps-container">

        {apps.map((app, index) => (
          <div className="app-card" key={index}>

            <h3>{app.name}</h3>

            <p>{app.description}</p>

            <Link to={app.path}>
              Open
            </Link>

          </div>
        ))}

      </div>
    </>
  );
};

export default Apps;