import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Positions = () => {
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    axios
      .get("https://zerodha-backend-go5a.onrender.com/allPositions", {
        withCredentials: true,
      })
      .then((res) => {
        setPositions(res.data);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          console.log("Error fetching positions:", error);
        }
      });
  }, [navigate]);

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          <tbody>
            {positions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const pnl = curValue - stock.avg * stock.qty;

              const profClass = pnl >= 0 ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>

                  <td className={profClass}>
                    {pnl.toFixed(2)}
                  </td>

                  <td className={dayClass}>
                    {stock.day}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;