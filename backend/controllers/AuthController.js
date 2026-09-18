const User = require("../model/UserModel");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username, createdAt } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      email,
      password,
      username,
    });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
  httpOnly: false,
  secure: true,
  sameSite: "none",
});

    return res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Signup failed",
      error: error.message,
    });
  }
};


module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Incorrect password or email",
      });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.status(401).json({
        message: "Incorrect password or email",
      });
    }

    const token = createSecretToken(user._id);

   res.cookie("token", token, {
  httpOnly: false,
  secure: true,
  sameSite: "none",
});

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

module.exports.Logout = (req, res) => {
  res.clearCookie("token", {
  httpOnly: false,
  secure: true,
  sameSite: "none",
});

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};