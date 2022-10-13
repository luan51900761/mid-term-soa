import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const RootLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default RootLayout;
