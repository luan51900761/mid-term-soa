import React from "react";

const FormTuition = ({ checkOtp, sendOtpHandler }) => {
  return (
    <form className="px-4 pt-6 pb-8 mb-4 bg-white rounded  grid gap-4 grid-cols-2">
      <div>
        <div className="mb-4 ">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="username"
          >
            Người nộp tiền
          </label>
          <input
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            readOnly
            value="Nguyen van c"
            disabled
            style={{ cursor: "not-allowed" }}
          />
        </div>
        <div className="mb-4 ">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>

          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            readOnly
            value="123@gmail.com"
            disabled
            style={{ cursor: "not-allowed" }}
          />
        </div>
        <div className="mb-4 ">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Số điện thoại
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="sdt"
            type="text"
            readOnly
            disabled
            style={{ cursor: "not-allowed" }}
            value={"0123654789"}
          />
          {/* <p className="text-xs italic text-red-500">
                    Please choose a password.
                  </p> */}
        </div>
      </div>
      <div className="">
        <div className="mb-4 ">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="msv"
          >
            Mã số sinh viên
          </label>
          <input
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="msv"
            type="text"
            placeholder="519xxxxxx"
          />
        </div>
        <div className="mb-4 ">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="fullname"
          >
            Họ tên
          </label>

          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="fullname"
            type="text"
            placeholder="Nguyen van c"
            readOnly
            disabled
            style={{ cursor: "not-allowed" }}
          />
        </div>
        <div className="mb-4 ">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="payment"
          >
            Tiền cần nộp
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-red-700 border  rounded shadow appearance-none "
            id="payment"
            type="text"
            readOnly
            disabled
            style={{ cursor: "not-allowed" }}
            value={"0213231"}
          />
          {/* <p className="text-xs italic text-red-500">
                    Please choose a password.
          </p> */}
        </div>
      </div>
      <h3 className="pt-4 text-2xl text-center col-span-2">
        Thanh toán học phí
      </h3>

      {/* thanh toán */}
      <div className="mb-4 ">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="balance"
        >
          Số dư khả dụng
        </label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="balance"
          type="text"
          readOnly
          disabled
          style={{ cursor: "not-allowed" }}
          value={"10.000.000đ"}
        />
      </div>
      <div className="mb-4 ">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="balance"
        >
          Số tiền cần thanh toán
        </label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-red-700 border rounded shadow appearance-none"
          id="balance"
          type="text"
          readOnly
          disabled
          style={{ cursor: "not-allowed" }}
          value={"10.000.000đ"}
        />
      </div>

      {/* Mã OTP */}
      {checkOtp && (
        <div className="col-span-2">
          <div className="mb-4 ">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="otp"
            >
              Mã OTP
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-red-700 border rounded shadow appearance-none"
              id="otp"
              type="text"
              placeholder="Nhập mã OTP"
            />
          </div>
        </div>
      )}

      {/* error */}
      <div className="col-span-2">
        <div
          className="flex items-center  bg-red-500 text-white text-sm font-bold px-4 py-2"
          role="alert"
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm1 16a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0zm0-8a1 1 0 1 1-1-1 1 1 0 0 1 1 1z" />
          </svg>
          <p className=" m-0">Không đủ số dư để thanh toán</p>
        </div>
      </div>
      {/* button */}
      <div className="col-span-2">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={sendOtpHandler}
        >
          Thanh toán
        </button>
      </div>
    </form>
  );
};

export default FormTuition;
