import React from "react";
import { Link } from "react-router-dom";

const NotLoggin = () => {
  return (
    <div className="m-4 text-[16px] ">
      Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại
      <Link to="login" className="p-2 ml-2 bg-blue-500 text-white rounded-sm">
        Đăng nhập{" "}
      </Link>
    </div>
  );
};

export default NotLoggin;
