import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://zerodha-backend-go5a.onrender.com/allOrders", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Orders data:", res.data);
        setOrders(res.data);
      })
      .catch((error) => {
        console.log("Orders error:", error);

        if (error.response?.status === 401) {
          navigate("/login");
        }
      });
  }, [navigate]);

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h3>You haven't placed any orders today</h3>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id || index}>
                  <td>DELIVERY</td>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{order.price}</td>
                  <td>{order.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Orders;