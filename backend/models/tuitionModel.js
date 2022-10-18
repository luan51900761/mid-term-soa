const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tuitionSchema = new Schema(
  {
    username: String, // username of the tutor
    needToPay: Number, // tiền cần phải nộp
    paid: Number, // tiền đã nộp
  },
  {
    timestamps: true,
  }
);

const Tuition = mongoose.model("Tuition", tuitionSchema);

module.exports = Tuition;
