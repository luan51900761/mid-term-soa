import React from "react";
import { Form } from "react-router-dom";

const LoginForm = () => {
  return (
    <Form>
      <div className="mb-2">
        <label
          htmlFor="msv"
          className="block text-gray-700 text-sm md:text-base font-bold mb-2"
        >
          Mã sinh viên
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 focus:outline-none focus:border-sky-600 placeholder-slate-400 rounded-lg px-3 py-2"
          id="msv"
          placeholder="Nhập mã sinh viên"
        />
      </div>
      {/* error */}
      {/* <p className="mb-2 text-red-600">Something is very wrong</p> */}

      <div className="mb-4">
        <label
          htmlFor="password"
          className=" block text-gray-700 text-sm font-bold mb-2 md:text-base"
        >
          Mật khẩu
        </label>
        <input
          type="password"
          className="w-full border focus:outline-none focus:border-sky-600  border-gray-300 placeholder-slate-400 rounded-lg px-3 py-2"
          id="password"
          placeholder="Nhập mật khẩu"
        />
      </div>
      <div>
        <button className="w-full bg-blue-500 text-white rounded-lg px-3 py-2 md:text-base hover:opacity-70">
          Đăng nhập
        </button>
      </div>
    </Form>
  );
};

export default LoginForm;
