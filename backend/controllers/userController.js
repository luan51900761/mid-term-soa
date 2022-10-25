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
			try{
			TuitionBill.findOneAndUpdate(
				{ 
					username: req.body.username 
				},
				{
					paid: req.body.paid
				}, function (err, bill) {
				if (bill) return res.status(200).json({ msg: "successfully updated"});
				return res.status(401).json({ msg: "error" });
			  });
			} catch (error) {
				return res.status(401).json({ msg: "error" });
			}
		}
	} 
	async createTransaction(req, res, next) {
		const errors = await validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ 
				status: "Thất bại",
				msg: errors.array()[0].msg });
		}else {
			try{
				console.log(req.body.receiveremail)
				Transaction.insertMany(
					{ 
						senderUsername: req.body.username,
						receiverUsername: req.body.receiverusername, 
						receiverEmail: req.body.receiveremail ,
						tuition: req.body.tuition 	
					}, function (err, transaction) {
				if (transaction) return res.status(200).json({ msg: "successfully created"});
				return res.status(401).json({ msg: "error" });
			  });
			} catch (error) {
				return res.status(401).json({ msg: "error" });
			}
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
	async getUser(req, res, next) {
		const errors = await validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ 
				status: "Thất bại",
				msg: errors.array()[0].msg });
		}else {
			try {
			User.findOne(
				{
					 username: req.body.username
				}, function (err, user) {
				if (user) return res.status(200).json({ msg: "success", data: user });
				return res.status(401).json({ msg: "username not found" });
			  });
			} catch (error) {
				return res.status(401).json({ msg: "error" });
			}
		}
	} 
}

module.exports = new UserController();