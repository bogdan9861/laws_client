import React from "react";
import { Input as AntdInput } from "antd";

import "./Input.scss";

const Input = (props) => {
  return <AntdInput className="input" {...props} />;
};

export default Input;
