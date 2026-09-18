const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.userVerification = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    console.log("TOKEN RECEIVED:", token);

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Please login first",
      });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        console.log("JWT ERROR:", err.message);

        return res.status(401).json({
          status: false,
          message: "Invalid or expired token",
        });
      }

      console.log("JWT DATA:", data);

      const user = await User.findById(data.id);

      if (!user) {
        return res.status(401).json({
          status: false,
          message: "User not found",
        });
      }

      console.log("USER FOUND:", user.username);

      req.user = user;

      next();
    });
  } catch (error) {
    console.log("AUTH ERROR:", error);

    return res.status(500).json({
      status: false,
      message: "Authentication error",
    });
  }
};