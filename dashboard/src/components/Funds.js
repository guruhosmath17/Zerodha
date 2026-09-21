import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Funds = () => {
  const navigate = useNavigate();

  // Store funds received from backend
  const [funds, setFunds] = useState(null);

  // Fetch funds from backend
  useEffect(() => {
    axios
      .get("https://zerodha-backend-go5a.onrender.com/funds", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Funds data:", res.data);
        setFunds(res.data);
      })
      .catch((error) => {
        console.log("Funds error:", error);

        // User is not logged in
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          console.log("Error fetching funds:", error);
        }
      });
  }, [navigate]);

  // Show loading while fetching data
  if (!funds) {
    return (
      <div className="funds-page">
        <div style={{ padding: "30px" }}>
          <h3>Loading funds...</h3>
        </div>
      </div>
    );
  }

  // Calculate total collateral
  const totalCollateral =
    funds.collateralLiquid + funds.collateralEquity;

  return (
    <div className="funds-page">

      {/* ================= HEADER ================= */}

      <div className="funds-header">
        <div>
          <h2>Funds</h2>
          <p>
            Manage your trading balance and account funds
          </p>
        </div>

        <div className="fund-actions">

          <button
            className="fund-btn add-btn"
            onClick={() => alert("Add Funds feature coming soon")}
          >
            + Add Funds
          </button>

          <button
            className="fund-btn withdraw-btn"
            onClick={() => alert("Withdraw feature coming soon")}
          >
            Withdraw
          </button>

        </div>
      </div>


      {/* ================= BALANCE CARDS ================= */}

      <div className="fund-summary">

        {/* Available Margin */}

        <div className="fund-card">

          <div className="fund-card-top">
            <span>Available Margin</span>
            <span className="fund-icon">₹</span>
          </div>

          <h2>
            ₹
            {funds.availableMargin.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </h2>

          <p className="positive-text">
            Available for trading
          </p>

        </div>


        {/* Used Margin */}

        <div className="fund-card">

          <div className="fund-card-top">
            <span>Used Margin</span>
            <span className="fund-icon">↗</span>
          </div>

          <h2>
            ₹
            {funds.usedMargin.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </h2>

          <p className="neutral-text">
            Currently utilized
          </p>

        </div>


        {/* Available Cash */}

        <div className="fund-card">

          <div className="fund-card-top">
            <span>Available Cash</span>
            <span className="fund-icon">💰</span>
          </div>

          <h2>
            ₹
            {funds.availableCash.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </h2>

          <p className="positive-text">
            Ready to use
          </p>

        </div>

      </div>


      {/* ================= EQUITY SECTION ================= */}

      <div className="fund-section">

        <div className="section-heading">

          <div>
            <h3>Equity</h3>

            <p>
              Your equity account summary
            </p>
          </div>

        </div>


        <div className="fund-table">

          {/* Available Margin */}

          <div className="fund-row highlight-row">

            <span>
              Available margin
            </span>

            <strong>
              ₹{funds.availableMargin.toFixed(2)}
            </strong>

          </div>


          {/* Used Margin */}

          <div className="fund-row">

            <span>
              Used margin
            </span>

            <strong>
              ₹{funds.usedMargin.toFixed(2)}
            </strong>

          </div>


          {/* Available Cash */}

          <div className="fund-row">

            <span>
              Available cash
            </span>

            <strong>
              ₹{funds.availableCash.toFixed(2)}
            </strong>

          </div>


          <div className="fund-divider"></div>


          {/* Opening Balance */}

          <div className="fund-row">

            <span>
              Opening Balance
            </span>

            <span>
              ₹{funds.openingBalance.toFixed(2)}
            </span>

          </div>


          {/* Payin */}

          <div className="fund-row">

            <span>
              Payin
            </span>

            <span>
              ₹{funds.payin.toFixed(2)}
            </span>

          </div>


          {/* SPAN */}

          <div className="fund-row">

            <span>
              SPAN
            </span>

            <span>
              ₹{funds.span.toFixed(2)}
            </span>

          </div>


          {/* Delivery Margin */}

          <div className="fund-row">

            <span>
              Delivery margin
            </span>

            <span>
              ₹{funds.deliveryMargin.toFixed(2)}
            </span>

          </div>


          {/* Exposure */}

          <div className="fund-row">

            <span>
              Exposure
            </span>

            <span>
              ₹{funds.exposure.toFixed(2)}
            </span>

          </div>


          {/* Options Premium */}

          <div className="fund-row">

            <span>
              Options premium
            </span>

            <span>
              ₹{funds.optionsPremium.toFixed(2)}
            </span>

          </div>


          <div className="fund-divider"></div>


          {/* Collateral Liquid */}

          <div className="fund-row">

            <span>
              Collateral (Liquid funds)
            </span>

            <span>
              ₹{funds.collateralLiquid.toFixed(2)}
            </span>

          </div>


          {/* Collateral Equity */}

          <div className="fund-row">

            <span>
              Collateral (Equity)
            </span>

            <span>
              ₹{funds.collateralEquity.toFixed(2)}
            </span>

          </div>


          {/* Total Collateral */}

          <div className="fund-row total-row">

            <strong>
              Total Collateral
            </strong>

            <strong>
              ₹{totalCollateral.toFixed(2)}
            </strong>

          </div>

        </div>

      </div>


      {/* ================= COMMODITY ================= */}

      <div className="commodity-card">

        <div className="commodity-icon">
          📊
        </div>


        <div className="commodity-content">

          <h3>
            Commodity Account
          </h3>

          <p>
            You don't have a commodity account.
            Open one to start trading in commodities.
          </p>

        </div>


        <button
          className="open-account-btn"
          onClick={() =>
            alert("Commodity account feature coming soon")
          }
        >
          Open Account
        </button>

      </div>

    </div>
  );
};

export default Funds;