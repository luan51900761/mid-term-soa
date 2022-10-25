const { check, body } = require('express-validator');
const User = require('../models/userModel');
const TuitionBill = require('../models/tuitionBillModel');
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
			return TuitionBill.findOne({ username: value }).then(tuitionBill => {
				if (tuitionBill) { 
					if(tuitionBill.paid === tuitionBill.tuition) {
						throw new Error('Sinh viên này đã hoàn thành việc thanh toán học phí!');
					}
					return true;
				}
				throw new Error('Không tìm thấy mã số sinh viên');
			});
		}),
	
];
