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

const TuitionBill = mongoose.model("TuitionBill", tuitionBillSchema);

module.exports = TuitionBill;
