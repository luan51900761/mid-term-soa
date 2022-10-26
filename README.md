frontend: npm run dev
backend: npm run start
website: http://localhost:5173
#API:

##Lấy xác thực thanh toán để lấy mã otp
POST http://localhost:3000/v1/api/users/pay-tuition 
{
	username
}

##Hủy giao dịch hiện tại
GET  http://localhost:3000/v1/api/users/cancel-transaction

##Lấy mã OTP mới
GET  http://localhost:3000/v1/api/users/get-otp

##Xác thực OTP
POST http://localhost:3000/v1/api/users/verify-otp
{
	otp
}

##Thêm hóa đơn học phí
POST http://localhost:3000/v1/api/tuition-bill/add-tuition-bill
{
	username,
	tuition,
	paid
}