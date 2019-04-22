const mongoose = require("mongoose");

const chalSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "hidden"
    },
    files: [String],
    points: {
      type: Number,
      required: true
    },
    flag: {
      type: String,
      required: true
    },
    users: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chal", chalSchema);
