const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "user"
    },
    active: {
      type: Number,
      default: 1
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
