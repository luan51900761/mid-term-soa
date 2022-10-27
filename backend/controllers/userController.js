const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const OTP = require('../models/otpModel');
const TuitionBill = require('../models/tuitionBillModel');
const { validationResult } = require('express-validator');
const sendMail = require('../utils/email');
const transactionModel = require('../models/transactionModel');
const mongoose = require('mongoose');

class UserController {
	//POST /pay-tuition
	async payTuition(req, res, next) {
		const errors = await validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				status: 'Thất bại',
				message: errors.array()[0].msg,
			});
		} else {
			const { username } = req.body;
			const user = await User.findOne({ username: username });
			const tuitionBill = await TuitionBill.findOne({ username: username });

			const generateOTP = await Math.floor(100000 + Math.random() * 900000);
			const otp = await OTP.create({
				otp: generateOTP,
				username: req.user.username,	
				email: req.user.email,
				expiredAt: Date.now() + 1000 * 60 * 2,
			});
			console.log(otp)

			const transaction = await Transaction.create({
				senderUsername: req.user.username,
				receiverUsername: username,
				senderEmail: req.user.email,
				tuition: tuitionBill.tuition,
				status: 0,
				otp: otp._id,
			});

			await OTP.updateOne(
				{ _id: otp._id },
				{ $set: { transaction: transaction._id } }
			);
			const currUser = await User.findOneAndUpdate(
				{ username: req.user.username },
				{ $set: { currentTransaction: transaction._id } }
			);
			console.log(`Mã OTP của bạn là: ${generateOTP}`);

			const message = `Mã OTP xác thực có hiệu lực trong vòng 3 phút.\nMã OTP của bạn là : ${generateOTP}.\n `;
			await sendMail({
				email: req.user.email,
				subject: 'Mã OTP xác thực thanh toán học phí',
				message,
			});

			return res.status(200).json({
				status: 'Thành công',
				message:
					'Mã OTP đã được gửi tới địa chỉ email của bạn. LƯU Ý: Mã OTP có hiệu lực trong vòng 3 phút.',
			});
		}
	}
	//POST /verify-otp
	async verifyOTP(req, res) {
		const errors = await validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				status: 'Thất bại',
				message: errors.array()[0].msg,
			});
		} else {
			const transaction = await Transaction.findOne({
				_id: mongoose.Types.ObjectId(req.user.currentTransaction),
			});
			await Transaction.updateOne(
				{ _id: mongoose.Types.ObjectId(req.user.currentTransaction) },
				{ $set: { status: 1 } }
			);
			await TuitionBill.updateOne(
				{ username: transaction.receiverUsername },
				{ $set: { paid: transaction.tuition } }
			);
			await User.updateOne(
				{ username: req.user.username },
				{
					$set: {
						currentTransaction: 'none',
						balance: req.user.balance - transaction.tuition,
					},
				}
			);
			res.status(200).json({
				status: 'Thành công',
				message: `Thanh toán học phí thành công`,
			});
		}
	}

	async test(req, res) {
		console.log(req);
		res.status(200).json({ message: 'Thành công' });
	}
	//GET /cancel-transaction
	async cancelTransaction(req, res) {
		const transaction = await Transaction.findOne({
			_id: mongoose.Types.ObjectId(req.user.currentTransaction),
		});
		await console.log(transaction);
		await Transaction.findOneAndUpdate(
			{ _id: mongoose.Types.ObjectId(req.user.currentTransaction) },
			{ $set: { status: 2 } }
		);
		await User.findOneAndUpdate(
			{ username: req.user.username },
			{ $set: { currentTransaction: 'none' } }
		);

		res.status(200).json({ message: 'Hủy giao dịch thành công' });
	}

	//GET /get-otp
	async getOTP(req, res) {
		const transaction = await Transaction.findOne({ _id: req.user.currentTransaction });
		if (!transaction) {
			return res.status(400).json({
				status: 'Thất bại',
				message: 'Không có giao dịch nào đang được thực hiện',
			});
		}
		const generateOTP = await Math.floor(100000 + Math.random() * 900000);
		const otp = await OTP.create({
			otp: generateOTP,
			username: req.user.username,
			transaction: transaction._id,
			email: req.user.email,
			expiredAt: Date.now() + 1000 * 60 * 2,
		});
		await Transaction.updateOne({ _id: transaction._id }, { $set: { otp: otp._id } });
		console.log(`Mã OTP của bạn là: ${generateOTP}`);
		const message = `Mã OTP xác thực có hiệu lực trong vòng 3 phút.\nMã OTP của bạn là : ${generateOTP}.\n `;
		await sendMail({
			email: req.user.email,
			subject: 'Mã OTP xác thực thanh toán học phí',
			message,
		});
		return res.status(200).json({
			status: 'Thành công',
			message:
				'Mã OTP mới đã được gửi tới địa chỉ email của bạn. LƯU Ý: Mã OTP có hiệu lực trong vòng 3 phút.',
		});
	}

	async test(req, res, next) {
		const token = req.headers.authorization;
		console.log(token);
		try {
			const decoded = await promisify(jwt.verify)(accessToken, process.env.JWT_SECRET);
			console.log('decoded' + decoded);
			if (!decoded) return res.status(401).json({ msg: 'Invalid token' });

			const user = await User.findById(decoded.id);
			req.user = user;
			next();
		} catch (err) {
			return res.status(401).json({ msg: 'Token is not valid' });
		}
		res.status(200).json({ user, tuitionBill });
	}

	//POST /get-user
	async getUser(req, res, next) {
		const errors = await validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				status: 'Thất bại',
				msg: errors.array()[0].msg,
			});
		} else {
			try {
				User.findOne(
					{
						username: req.body.username,
					},
					function (err, user) {
						if (user) return res.status(200).json({ msg: 'success', data: user });
						return res.status(401).json({ msg: 'Không tìm thấy sinh viên' });
					}
				);
			} catch (error) {
				return res.status(401).json({ msg: 'error' });
			}
		}
	}

	//GET /get-all-transactions
	async getAllTransactions(req, res, next) {
		const errors = await validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				status: 'Thất bại',
				msg: errors.array()[0].msg,
			});
		} else {
			try {
				Transaction.find(
					{
					senderUsername: req.user.username
					},
					function (err, user) {
						if (user) return res.status(200).json({ msg: 'success', data: user });
						return res.status(401).json({ msg: 'username not found' });
					}
				);
			} catch (error) {
				return res.status(401).json({ msg: 'error' });
			}
		}
	}
}
module.exports = new UserController();
