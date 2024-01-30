const express = require("express");
const router = express.Router();
const {
  createauthor,
  getauthor,
  deleteauthor,
  updateauthor
} = require("../../controller/graphqlController/authorcontroller");
const protect = require("../../Middleware/authMiddleware");

router.post("/create", protect, createauthor);

router.get("/get", getauthor);

router.patch("/update", protect, updateauthor)

router.delete("/delete", protect, deleteauthor);

module.exports = router;
