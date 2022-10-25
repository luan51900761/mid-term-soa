const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const OTP = require('../models/otpModel');
const TuitionBill = require('../models/tuitionBillModel');
const { validationResult } = require('express-validator');
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
class UserController {
	async payTuition(req, res, next) {
		const errors = await validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ 
				status: "Thất bại",
				msg: errors.array()[0].msg });
		}else {
			const {username} = req.body 
			
		}
	}

	async test (req, res, next) {
		const token = req.headers.authorization;
		console.log(token);
		try {
			const decoded = await promisify(jwt.verify)(
			  accessToken,
			  process.env.JWT_SECRET
			);
			console.log("decoded"+ decoded);
			if (!decoded) return res.status(401).json({ msg: "Invalid token" });
			
			const user = await User.findById(decoded.id);
			req.user = user;
			next();
		 } catch (err) {
			return res.status(401).json({ msg: "Token is not valid" });
		 }
		res.status(200).json({user, tuitionBill});
	}
}

module.exports = new UserController();