import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import service from "../../api/service";

import logo from "../../assets/logo.png";
import "./Header.scss";

const Header = () => {
  const [user, setUser] = useState(null);
  const { getCurrentUser } = service();

  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser().then((res) => {
      setUser(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  const exit = () => {
    localStorage.removeItem("laws-token");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <img src={logo} alt="" />
          <h1 className="header__title">Официальные правовые акты</h1>
          <Link className="header__profile" to={"/profile"}>
            {user?.role === "ADMIN" ? (
              <img
                width={30}
                src="https://img.icons8.com/?size=100&id=YIZ59MTJsuUz&format=png&color=ffffff"
                alt=""
              />
            ) : (
              <img
                width={30}
                src="https://img.icons8.com/?size=100&id=84020&format=png&color=ffffff"
                alt=""
              />
            )}

            <span className="header__name">{user?.name}</span>
          </Link>

          <button className="header__exit" onClick={exit}>
            <img
              width={30}
              src="https://img.icons8.com/?size=100&id=Q1xkcFuVON39&format=png&color=FF0000"
              alt=""
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
