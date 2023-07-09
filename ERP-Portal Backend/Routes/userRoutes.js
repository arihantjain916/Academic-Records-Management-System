const express = require("express");
const router = express.Router();
const {
  logInUser,
  registerUser,
  getUserProfile,
  logOut,
} = require("../controller/usercontroller");
// const protect = require("../Middleware/authMiddleware");
// const logOut = require("../Middleware/authMiddleware");

const protect = require("../Middleware/authMiddleware");

router.post("/signup", registerUser);

//Auth user & get token
router.post("/login", logInUser);

//get  User Profile
router.get("/profile", protect, getUserProfile);

// logout the user
router.get("/logout", protect, logOut);

module.exports = router;
