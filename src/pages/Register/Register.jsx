import React, { useState } from "react";
import { Card, Divider, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../compoents/input/Input";
import Button from "../../compoents/Button/Button";

import "./Register.scss";
import service from "../../api/service";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { register } = service();
  const navigate = useNavigate();

  const onRegister = () => {
    register({ name, password, phone }).then((res) => {
      localStorage.setItem("laws-token", res.data.token);
      navigate("/");
    });
  };

  return (
    <div className="wrapper">
      <Card className="card">
        <div className="card__header">
          {/* <img
            className="form__logo"
            src="http://publication.pravo.gov.ru/images/logo.png"
            alt=""
          /> */}
          <h1 className="card__title">Регистрация</h1>
        </div>
        <Form className="form">
          <div className="">
            <span
              style={{
                marginBottom: 4,
                display: "block",
                color: "rgba(0,0,0,0.7)",
              }}
            >
              Имя пользователя
            </span>
            <Input
              placeholder="Введите имя"
              onChange={(e) => setName(e.target.value)}
            />
            <span
              style={{
                marginBottom: 4,
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
                marginBottom: 4,
                display: "block",
                color: "rgba(0,0,0,0.7)",
              }}
            >
              Пароль
            </span>
            <Input
              placeholder="Придумайте пароль"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Divider />

            <span>
              Уже зарегистрировались? <Link to={"/login"}>Войти</Link>
            </span>
          </div>

          <Button
            title={"Зарегистрироваться"}
            style={{ marginTop: "auto" }}
            onClick={onRegister}
          />
        </Form>
      </Card>
    </div>
  );
};

export default Register;
