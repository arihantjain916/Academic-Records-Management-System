const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
    subject: {
        type: String,
        ref: "Subject Information",
        required: true,
    },
    student: {
        type: String,
        ref: "Student Information",
        required: true,
    },
    marks: {
        type: Number,
        required: true,
        min: [0,"Marks are not less than 0"],
        max: [100,"Marks can't greater than 100"]
    },
});

const Marks = mongoose.model("Marks Information", marksSchema);

module.exports = Marks;
