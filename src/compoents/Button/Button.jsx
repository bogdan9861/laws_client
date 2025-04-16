import React from "react";
import { Button as AntdButton } from "antd";

import "./Button.scss";

const Button = ({ title, style, onClick }) => {
  return (
    <AntdButton className="button" style={style} onClick={onClick}>
      {title}
    </AntdButton>
  );
};

export default Button;
