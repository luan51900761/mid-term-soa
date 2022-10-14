import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const RootLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className=" max-w-3xl  basis-4/5  m-auto  shadow-slate-300 shadow-md">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
