const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tuitionBillSchema = new Schema(
  {
    username: { type: String, unique: true }, // username of the tutor
    tuition: Number, // tiền cần phải nộp
    paid: { type: Number, default: 0 }, // tiền đã nộp
    lockTime: Date,
  },
  {
    timestamps: true,
  }
);

const TuitionBill = mongoose.model("TuitionBill", tuitionBillSchema);

module.exports = TuitionBill;
