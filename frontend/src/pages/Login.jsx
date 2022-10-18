import React from "react";
import LoginForm from "../components/Login/LoginForm";

const Login = () => {
  return (
    <section className="h-screen">
      <div className=" container m-auto relative top-1/2 translate-y-[-50%]">
        <div className="flex justify-center items-center h-full">
          <div className="bg-white w-[350px] sm:w-[400px] rounded-lg shadow-lg">
            <div className="p-4">
              <h1 className="text-2xl font-bold text-center mb-4">Đăng nhập</h1>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
