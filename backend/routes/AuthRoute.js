const {
  Signup,
  Login,
  Logout,
} = require("../controllers/AuthController");

const {
  userVerification,
} = require("../Middelwares/AuthMiddleware");

const router = require("express").Router();

router.post("/signup", Signup);

router.post("/login", Login);

router.post("/logout", Logout);

// New route
router.post("/set-token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      status: false,
      message: "Token is required",
    });
  }

  res.cookie("token", token, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });

  res.json({
    status: true,
    message: "Token saved",
  });
});

router.post("/", userVerification);

module.exports = router;