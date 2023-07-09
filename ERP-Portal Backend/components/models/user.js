const mongoose = require("mongoose");
const student = require("./studentinfo.js");

const userchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    maxlength: 250,
    minlength: 5,
    required: true,
  },
  type: {
    type: String,
    default: "user",
  },
});

const User = new mongoose.model("User Information", userchema);

module.exports = User;
