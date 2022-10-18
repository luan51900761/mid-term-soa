import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="basis-1/5 bg-slate-700 min-h-screen text-white font-medium text-center">
      <ul className="p-4">
        <li className="p-3">
          <h1>
            Số dư tài khoản : <span>10.000.000đ</span>{" "}
          </h1>
        </li>
        <li className="p-3 ">
          <Link to="/" className="link-item">
            Trang chủ
          </Link>
        </li>
        <li className="p-3">
          <Link to="/payment-history" className="link-item">
            Lịch sử thanh toán
          </Link>
        </li>

        <li className="p-3">
          <Link to="/login" className="link-item">
            Đăng nhập
          </Link>
        </li>
        <li className="p-3">
          <Link to="/logout" className="link-item">
            Đăng xuất
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
