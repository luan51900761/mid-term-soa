import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="basis-1/5 bg-slate-700 min-h-screen text-white font-medium text-center">
      <ul className="p-4">
        <li className="p-3 ">
          <Link to="/" className="link-item">
            Trang chủ
          </Link>
        </li>
        <li className="p-3">
          <Link to="/tuition" className="link-item">
            Học phí
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
