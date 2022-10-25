const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema(
	{
		senderUsername: {
			type: String,
			required: true,
		},
		receiverUsername: {
			type: String,
			required: true,
		},
		receiverEmail: {
			type: String,
			required: true,
		},
		tuition: {
			type: Number,
			required: true,
		},
		status: {
			type: Number,
			required: true,
			default: 0,
		}, // 0: đang xử lí, 1: thành công, 2: bị hủy
		otp: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Transaction', transactionSchema);
