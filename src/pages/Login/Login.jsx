import React, { useEffect, useState } from "react";

import { Card, Divider, Form, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../compoents/input/Input";
import Button from "../../compoents/Button/Button";

import "./Login.scss";
import service from "../../api/service";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = service();
  const navigate = useNavigate();

  const onLogin = () => {
    setError("");

    login({ phone, password })
      .then((res) => {
        localStorage.setItem("laws-token", res.data.token);
        navigate("/");
      })
      .catch((e) => {
        if (e.response.data.message) {
          setError(e.response.data.message);
        } else {
          console.log(e);
        }
      });
  };

  return (
    <div className="wrapper">
      <Card className="card">
        <div className="card__header">
          <h1 className="card__title">Войдите в аккаунт</h1>
        </div>
        <Form className="form">
          <div>
            <span
              style={{
                marginBottom: 5,
                display: "block",
                color: "rgba(0,0,0,0.7)",
              }}
            >
              Номер телефона
            </span>
            <Input
              placeholder="+7 (***) **-** "
              onChange={(e) => setPhone(e.target.value)}
            />
            <span
              style={{
                marginBottom: 5,
                display: "block",
                color: "rgba(0,0,0,0.7)",
              }}
            >
              Пароль
            </span>
            <Input
              placeholder="Введите пароль"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Typography.Text type="danger">{error}</Typography.Text>

            <Divider />

            <span>
              У вас нет аккаунта? <Link to={"/register"}>Создать</Link>
            </span>
          </div>

          <Button
            title={"Войти"}
            style={{ marginTop: "auto" }}
            onClick={onLogin}
          />
        </Form>
      </Card>
    </div>
  );
};

export default Login;
