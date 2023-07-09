const express = require("express");
const router = express.Router();
const {
    createclass,
    deleteclass,
    createsubject,
    getsubjectofclass,
} = require("../controller/classcontroller");
const protect = require("../Middleware/authMiddleware");

router.post("/create", protect, createclass);

router.post("/:id/subjects", protect, createsubject);

router.get("/:id/subjects", protect, getsubjectofclass)

// router.delete("/delete", protect, deleteclass)

module.exports = router;
