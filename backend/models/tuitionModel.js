const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tuitionBillSchema = new Schema(
  {
    username: String, // username of the tutor
    tuition: Number, // tiền cần phải nộp
    paid: Number, // tiền đã nộp
  },
  {
    timestamps: true,
  }
);

const Tuition = mongoose.model("Tuition", tuitionSchema);

module.exports = Tuition;
