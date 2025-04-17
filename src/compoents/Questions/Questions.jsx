import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import service from "../../api/service";
import "./Questions.scss";
import { Input } from "antd";

const Questions = ({ user, questions, setQuestions }) => {
  const { getQuestions, removeQuestion } = service();
  const navigate = useNavigate();

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
          <li
            className="question__item"
            key={question.id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/question/${question.id}`)}
          >
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

            <span className="question__item-title">{question.title}</span>
            <span className="question__item-text">{question.text}</span>
            <span className="question__item-number">
              №{`${question.document_number}`.replace("№", "")}
            </span>
            <Link to={`/question/${question.id}`}>Пройти</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Questions;
