const express = require("express");
const router = express.Router();
const {
  createbook,
  getbook,
  updatebook,
  deletebook,
} = require("../../controller/graphqlController/bookscontroller");
const protect = require("../../Middleware/authMiddleware");

router.post("/create", protect, createbook);

router.get("/get", getbook);

router.patch("/update", protect, updatebook)

router.delete("/delete", protect, deletebook)

module.exports = router;
