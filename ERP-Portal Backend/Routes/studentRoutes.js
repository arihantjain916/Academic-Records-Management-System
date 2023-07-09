const express = require("express");
const router = express.Router();
const {
  registerStudent,
  getUserProfile,
  deleteStudent,
  UpdateUserProfile,
} = require("../controller/studentcontroller");
const protect = require("../Middleware/authMiddleware");

router.post("/register", protect, registerStudent);

router.get("/profile", protect, getUserProfile);

// delete the user
router.delete("/delete/:id", protect, deleteStudent);

router.patch("/profile/update/:id", protect, UpdateUserProfile);

module.exports = router;
