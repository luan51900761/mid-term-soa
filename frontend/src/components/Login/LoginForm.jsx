import React from "react";
// import { Form } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginUser } from "../../store/user/userSlice";
const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const onFinish = (values) => {
    dispatch(fetchLoginUser(values));
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

      {error && <p className="text-red-500 ml-15">{error}</p>}

      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <Button type="primary" htmlType="submit" className="w-full">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
