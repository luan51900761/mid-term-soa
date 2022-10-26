const TuitionBill = require('../models/tuitionBillModel');

class TuitionBillController {
	async addTuitionBill(req, res) {
		const { username, tuition, paid } = req.body;

		const checkTuitionBill = await TuitionBill.findOne({ username: username });

		if (checkTuitionBill) {
			res.status(400).json({
				status: 'fail',
				message: 'Hóa đơn thanh toán học phí đã tồn tại',
			});
		} else {
			const tuitionBill = await TuitionBill.create({
				username,
				tuition,
				paid,
			});

			res.status(200).json({
				status: 'success',
				data: {
					tuitionBill,
				},
			});
		}
	}
}

module.exports = new TuitionBillController();
