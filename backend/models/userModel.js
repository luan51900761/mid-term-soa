const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: {
      type: String,
      select: false,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    fullname: String,
    balance: {
      type: Number,
      default: 500000000,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(">>> Password: ", this.password);
    return next();
  } catch (error) {
    return next(error);
  }
});
const User = mongoose.model("User", userSchema);

module.exports = User;
