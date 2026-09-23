const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      status: true,
      message: "Signup successful",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: false,
      message: "Signup failed",
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );

    // Cookie for dashboard authentication
    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });

    res.json({
      status: true,
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: false,
      message: "Login failed",
    });
  }
};

const Logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });

  res.json({
    status: true,
    message: "Logout successful",
  });
};

module.exports = {
  Signup,
  Login,
  Logout,
};