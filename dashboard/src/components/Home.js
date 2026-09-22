import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import Login from "./Login";
import Signup from "./Signup";

const Home = () => {
  return (
    <Routes>

      {/* Login page */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Signup page */}
      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* Dashboard */}
      <Route
        path="/*"
        element={
          <>
            <TopBar />
            <Dashboard />
          </>
        }
      />

    </Routes>
  );
};

export default Home;