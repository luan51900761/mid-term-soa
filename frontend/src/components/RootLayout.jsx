import { Link, Outlet, useNavigate } from "react-router-dom";

import {
  InfoCircleOutlined,
  HistoryOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/user/userSelect";
import NotLoggin from "../pages/NotLoggin";
import { createAxios } from "../../utils/apiRequestAxios";
const { Content, Sider } = Layout;
import { fetchLogoutUser, logoutSuccess } from "../store/user/userSlice";

const labelSidebar = [
  {
    label: "Thông tin học phí",
    link: "/",
  },
  {
    label: "Lịch sử thanh toán",
    link: "/lich-su-thanh-toan",
  },
  {
    label: "Đăng xuất",
    link: "/dang-xuat",
  },
];

const RootLayout = () => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const token = user?.token;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const handleLogout = () => {
    dispatch(fetchLogoutUser({ axiosJWT, token, navigate }));
  };
  return (
    (!user && <NotLoggin />) ||
    (user && (
      <Layout className="">
        <Sider
          className="min-h-screen"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            // console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            // console.log(collapsed, type);
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={({ key }) => {
              if (key === "/dang-xuat") {
                handleLogout();
              } else {
                navigate(key);
              }
            }}
            items={[InfoCircleOutlined, HistoryOutlined, LogoutOutlined].map(
              (icon, index) => ({
                key: labelSidebar[index].link,
                icon: React.createElement(icon),
                label: labelSidebar[index].label,
              })
            )}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: "24px 16px 0",
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    ))
  );
};

export default RootLayout;
