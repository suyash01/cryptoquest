const mongoose = require("mongoose");

const answerSchema = mongoose.Schema(
  {
    chal: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    flag: {
      type: String,
      required: true
    },
    status: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);
