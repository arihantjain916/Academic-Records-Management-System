const mongoose = require("mongoose");
const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BlacklistedToken = mongoose.model(
  "Blacklist Token Information",
  blacklistedTokenSchema
);
module.exports = BlacklistedToken;
