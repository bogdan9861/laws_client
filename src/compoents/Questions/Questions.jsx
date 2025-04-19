import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import service from "../../api/service";
import "./Questions.scss";
import { Input, Tooltip } from "antd";
import PassedUsersModal from "../PassedUsersModal/PassedUsersModal";
import { reduceString } from "../../utils/reduceString";

const Questions = ({ user, questions, setQuestions }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { getQuestions, removeQuestion } = service();

  const getData = (number) => {
    getQuestions(number || "").then((res) => {
      let newArr = res.data;
      newArr.reverse();
      setQuestions(newArr);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const onDelete = (id) => {
    removeQuestion(id)
      .then((res) => {
        const newArr = questions.filter((el) => el.id !== id);
        setQuestions(newArr);
      })
      .catch((e) => console.log(e));
  };

  const onQuestionClick = (id) => {
    setOpenModal(true);
    setSelectedId(id);
  };

  return (
    <>
      <div className="question__header">
        <h1 className="question__title">Список вопросов</h1>
        <Input.Search
          onSearch={(number) => getData(number)}
          style={{ width: 400 }}
          placeholder="Поиск по номеру документа"
        />
      </div>
      <ul className="question__list">
        {questions.map((question) => (
          <div className="question__item-wrapper">
            <li
              className="question__item"
              key={question.id}
              style={{ cursor: "pointer" }}
              onClick={() => onQuestionClick(question.id)}
            >
              <Tooltip title={question.title}>
                <span className="question__item-title">
                  {reduceString(question.title, 200)}
                </span>
              </Tooltip>
              <span className="question__item-text">{question.text}</span>
              <span className="question__item-number">
                №{`${question.document_number}`.replace("№", "")}
              </span>
              <Link to={`/question/${question.id}`}>Пройти</Link>
            </li>

            {user?.role === "ADMIN" && (
              <button
                className="question__item-delete"
                onClick={() => onDelete(question.id)}
              >
                <img
                  width={20}
                  src="https://img.icons8.com/?size=100&id=68064&format=png&color=E23939"
                  alt=""
                />
              </button>
            )}
          </div>
        ))}
      </ul>
      {selectedId && (
        <PassedUsersModal
          id={selectedId}
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
    </>
  );
};

export default Questions;
