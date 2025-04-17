import React, { useEffect, useState } from "react";
import service from "../../api/service";
import { Button, Card, Divider, List } from "antd";

import Input from "../../compoents/input/Input";

import "./Profile.scss";
import Questions from "../../compoents/Questions/Questions";
import { Link, useNavigate } from "react-router-dom";
import QuestionForm from "../../compoents/QuestionForm/QuestionForm";

import logo from "../../assets/logo.png";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);

  const { getCurrentUser } = service();
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser().then((res) => {
      if (res.data.data.role !== "ADMIN") {
        navigate(-1);
      }
      setUser(res.data.data);
    });
  }, []);

  return (
    <div className="profile">
      <div className="profile__header">
        <div className="container">
          <div className="profile__header-inner">
            <Link to={"/"}>
              <img src={logo} alt="" />
            </Link>

            <div className="profile__header-inner">{user?.name}</div>
          </div>
        </div>
      </div>
      <div className="profile__body">
        <div className="container">
          <div className="profile__body-wrapper">
            {user?.role === "ADMIN" && (
              <>
                <QuestionForm
                  questions={questions}
                  setQuestions={setQuestions}
                />
              </>
            )}
            <Divider />
          </div>
          <Questions
            questions={questions}
            setQuestions={setQuestions}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
