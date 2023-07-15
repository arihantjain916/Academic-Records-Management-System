const express = require("express");
const router = express.Router();
const {
  getfine,
  createrent,
  returnbook,
  getRent,
  deleterent,
} = require("../../controller/graphqlController/rentcontroller");
const protect = require("../../Middleware/authMiddleware");

router.get("/fine/get", getfine);

router.get("/get", getRent);

router.get("/create", protect, createrent);

router.post("/return/book", returnbook);

router.delete("/delete", protect, deleterent);

// router.post("/pay", payfine);

module.exports = router;
