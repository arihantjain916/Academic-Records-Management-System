const mongoose = require("mongoose");
const User = require("./user");

const studentSchema = new mongoose.Schema({
  rollno: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    maxlength: 10,
    minlength: 10,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User Information",
    },
  ],
  classname:
  {
    type: String,
    required: true,
  },
  year: {
    type: String,
    default: "1st",
  },
});

const Student = mongoose.model("Student Information", studentSchema);

module.exports = Student;
