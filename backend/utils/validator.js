const { check, body } = require('express-validator');
const User = require('../models/userModel');
const TuitionBill = require('../models/tuitionBillModel');
const Transaction = require('../models/transactionModel');
const Otp = require('../models/otpModel');
const mongoose = require('mongoose');

exports.payTuitionValidator = [
	check('username')
		.exists()
		.withMessage('Vui lòng nhập mã số sinh viên')
		.notEmpty()
		.withMessage('Vui lòng nhập mã số sinh viên')
		.isLength({ min: 8, max: 8 })
		.withMessage('Mã số sinh viên phải có 8 ký tự')
		.isString()
		.withMessage('Mã số sinh viên không hợp lệ')
		.custom((value, { req }) => {
			return TuitionBill.findOne({ username: value }).then(tuitionBill => {
				if (req.user.currentTransaction !== 'none') {
					throw new Error(
						'Bạn không thể thực hiện giao dịch khác khi đang có giao dịch đang được thực hiện'
					);
				}
				if (tuitionBill) {
					if (tuitionBill.paid === tuitionBill.tuition) {
						throw new Error('Sinh viên này đã hoàn thành việc thanh toán học phí!');
					} else if (req.user.balance < tuitionBill.tuition) {
						throw new Error(
							'Số dư trong tài khoản không đủ để thanh toán học phí!'
						);
					}
					return true;
				}
				throw new Error('Không tìm thấy mã số sinh viên');
			});
		}),
];

exports.otpValidator = [
	check('otp')
		.exists()
		.withMessage('Vui lòng nhập mã otp')
		.notEmpty()
		.withMessage('Vui lòng nhập mã otp')
		.isLength({ min: 6, max: 6 })
		.withMessage('Mã otp phải có 6 số')
		.isNumeric()
		.withMessage('Mã otp không hợp lệ')
		.custom(async (otp, { req }) => {
			const transaction = await Transaction.findById(
				mongoose.Types.ObjectId(req.user.currentTransaction)
			);
			if (transaction) {
				const otpData = await Otp.findById(mongoose.Types.ObjectId(transaction.otp));
				let current = await new Date();
				const expire = await new Date(otpData.expiredAt);
				console.log(current);
				console.log(expire);
				if (otpData.otp === otp) {
					if (expire.getTime() < current.getTime() && otpData.otp == otp) {
						throw new Error(
							'Mã OTP của bạn đã hết hạn!'
						);
					}
				} else {
					throw new Error('Mã OTP không chính xác!');
				}
			} else {
				throw new Error('Không tìm thấy giao dịch');
			}
			const tuitionBill = await TuitionBill.findOne({
				username: transaction.receiverUsername,
			});
			if (tuitionBill) {
				if (tuitionBill.paid === tuitionBill.tuition) {
					throw new Error('Sinh viên này đã hoàn thành việc thanh toán học phí!');
				} else if (req.user.balance < tuitionBill.tuition) {
					throw new Error('Số dư trong tài khoản không đủ để thanh toán học phí!');
				}
			}
			return true;
		}),
];
