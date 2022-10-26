const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middlewareController = require('../controllers/middlewareController');
const validator = require('../utils/validator');
/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.post(
	'/pay-tuition',
	middlewareController.verifyToken,
	validator.payTuitionValidator,
	userController.payTuition
);

router.get(
	'/cancel-transaction',
	middlewareController.verifyToken,
	userController.cancelTransaction
);

router.get('/get-otp', middlewareController.verifyToken, userController.getOTP);

router.post(
	'/verify-otp',
	middlewareController.verifyToken,
	validator.otpValidator,
	userController.verifyOTP
);

router.get('/test', userController.test);
router.post('/create-transaction', userController.createTransaction);
router.post('/get-user', userController.getUser);

module.exports = router;
