import { useState } from "react";
import FormTuition from "../components/FormTuition/FormTuition";
import Table from "../components/Table/Table";

const Content = () => {
  const [checkOtp, setCheckOtp] = useState(false);
  // const [otp, setOtp] = useState("");
  // const [error, setError] = useState("");
  const sendOtpHandler = () => {
    setCheckOtp(true);
  };
  return (
    <div>
      {/* form taiwindcss */}
      <div className="container mx-auto">
        <Table />

        <h3 className="pt-4 text-2xl text-center">Thông tin học phí</h3>

        {/* Row */}

        {/* Col */}
        {/* Col */}
        <div className="w-full  bg-white p-5 rounded-lg lg:rounded-l-none">
          <FormTuition checkOtp={checkOtp} sendOtpHandler={sendOtpHandler} />
        </div>
      </div>
    </div>
  );
};

export default Content;
