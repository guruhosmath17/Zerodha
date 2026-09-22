import React from "react";
import { Link } from "react-router-dom";

const Apps = () => {
  return (
    <div className="apps-container">
      <h2>Apps</h2>
      <p className="apps-subtitle">
        Access all sections of your trading dashboard
      </p>

      <div className="apps-grid">

        {/* Dashboard */}
        <div className="app-card">
          <div className="app-icon">📊</div>

          <div className="app-content">
            <h3>Dashboard</h3>
            <p>View your portfolio summary</p>
          </div>

          <Link to="/" className="app-open">
            Open →
          </Link>
        </div>

        {/* Orders */}
        <div className="app-card">
          <div className="app-icon">📋</div>

          <div className="app-content">
            <h3>Orders</h3>
            <p>Place and manage your orders</p>
          </div>

          <Link to="/orders" className="app-open">
            Open →
          </Link>
        </div>

        {/* Holdings */}
        <div className="app-card">
          <div className="app-icon">💼</div>

          <div className="app-content">
            <h3>Holdings</h3>
            <p>View your investment holdings</p>
          </div>

          <Link to="/holdings" className="app-open">
            Open →
          </Link>
        </div>

        {/* Positions */}
        <div className="app-card">
          <div className="app-icon">📈</div>

          <div className="app-content">
            <h3>Positions</h3>
            <p>View your active positions</p>
          </div>

          <Link to="/positions" className="app-open">
            Open →
          </Link>
        </div>

        {/* Funds */}
        <div className="app-card">
          <div className="app-icon">💰</div>

          <div className="app-content">
            <h3>Funds</h3>
            <p>Check your available funds</p>
          </div>

          <Link to="/funds" className="app-open">
            Open →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Apps;