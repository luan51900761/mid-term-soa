import { Link, Outlet, useNavigate } from "react-router-dom";

import {
  InfoCircleOutlined,
  HistoryOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/userSelect";
import NotLoggin from "../pages/NotLoggin";
const { Content, Sider } = Layout;

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
  // if not login, redirect to login page
  const user = useSelector(selectUser);

  return (
    (!user && <NotLoggin />) ||
    (user && (
      <Layout className="">
        <Sider
          className="min-h-screen"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={({ key }) => {
              navigate(key);
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
