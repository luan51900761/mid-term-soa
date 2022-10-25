const { check, body } = require('express-validator');
const User = require('../models/userModel');

exports.payTuititonValidator = [
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
			return User.findOne({ username: value }).then(user => {
				if (user) { 
					return true;
				}
				throw new Error('Mã số sinh viên không tồn tại');
			});
		}),
	
];
