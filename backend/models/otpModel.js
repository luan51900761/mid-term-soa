const mongoose = require('mongoose');
const { Schema } = mongoose;

const otpSchema = new Schema(
	{
		otp: {
			type: String,
		},
		username: {
			type: String,
		},
		email: {
			type: String,
		},
		transaction: {
			type: String,
			default:''
		},
		expiredAt: {
			type: Date,
			default: Date.now() + 60 * 1000 * 3,
		},
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model('Otp', otpSchema);
