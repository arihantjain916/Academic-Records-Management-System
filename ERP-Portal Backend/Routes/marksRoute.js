const express = require("express");
const router = express.Router();

const { createmarksofstudent, getmarks } = require("../controller/markscontroller");
const protect = require("../Middleware/authMiddleware");

router.post("/:id/add", protect, createmarksofstudent);

router.get("/:id/marks", protect, getmarks)

module.exports = router;
