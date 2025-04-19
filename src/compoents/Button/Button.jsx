import React from "react";
import { Button as AntdButton } from "antd";

import "./Button.scss";

const Button = ({ title, style, onClick, disabled }) => {
  return (
    <AntdButton
      className="button"
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </AntdButton>
  );
};

export default Button;
