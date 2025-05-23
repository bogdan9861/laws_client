import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Divider, List } from "antd";

import Input from "../../compoents/input/Input";
import service from "../../api/service";

import Header from "../../compoents/header/Header";
import Questions from "../../compoents/Questions/Questions";
import QuestionForm from "../../compoents/QuestionForm/QuestionForm";

import "./Profile.scss";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

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
      {/* <div className="profile__header">
        <div className="container">
          <div className="profile__header-inner">
            <Link to={"/"}>
              <img src={logo} alt="" />
            </Link>

            <div className="profile__header-inner">{user?.name}</div>
          </div>
        </div>
      </div> */}
      <Header title="Профиль" />
      <div className="profile__body">
        <div className="container">
          <Button
            onClick={() => setFormOpen(true)}
            type="dashed"
            iconPosition="end"
            icon={
              <img
                style={{ transform: "translateY(3px)" }}
                width={17}
                src="https://img.icons8.com/?size=100&id=114100&format=png&color=3965E7"
              />
            }
          >
            Создать новый тест
          </Button>
          <div className="profile__body-wrapper">
            {user?.role === "ADMIN" && (
              <>
                <QuestionForm
                  open={formOpen}
                  setOpen={setFormOpen}
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
