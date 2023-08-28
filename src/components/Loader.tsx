import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

const Loader = () => {
  return (
    <div className="grid place-items-center w-full">
      <Spin indicator={<LoadingOutlined className="text-2xl" spin />} />
    </div>
  );
};

export default Loader;
