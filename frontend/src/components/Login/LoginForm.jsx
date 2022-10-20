import React from "react";
// import { Form } from "react-router-dom";
import { Button, Form, Input } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { fetchLoginUser } from "../../store/user/userSlice";
import { selectError, selectStatus } from "../../store/user/userSelect";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);
  const onFinish = (user) => {
    dispatch(fetchLoginUser({ user, navigate }));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 7,
      }}
      wrapperCol={{
        span: 17,
      }}
      // initialValues={{
      //   remember: true,
      // }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Mã sinh viên"
        name="username"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mã sinh viên! ",
          },
          {
            // Mã sinh viên phải có 8 ký tự
            min: 8,
            max: 8,
            message: "Mã sinh viên phải có 8 ký tự",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      {error && (
        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 18,
          }}
        >
          <p style={{ color: "red" }}>{error}</p>
        </Form.Item>
      )}

      <Form.Item
        wrapperCol={{
          offset: 7,
          span: 6,
        }}
      >
        <Button type="primary" htmlType="submit" className="w-full">
          {status == "loading" ? "loading..." : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
