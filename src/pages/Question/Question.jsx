import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import service from "../../api/service";
import { Card, Divider, Typography } from "antd";

import "./Question.scss";

const Question = () => {
  const { getQuestionById } = service();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    getQuestionById(id)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const onAnswer = (e, answer) => {
    if (isAnswerSelected) return;

    setIsAnswerSelected(true);

    if (!answer.isValid) {
      e.target.classList.add("error");
    }
  };

  return (
    <div className="wrapper">
      <Card className="question">
        <h1 className="question__title">{question?.title}</h1>
        <p className="question__text">{question?.text}</p>
        <ul className="question-answers__list">
          {question?.answers?.map((answer) => (
            <li
              key={answer.id}
              id={answer.id}
              className={`question-answers__item ${
                isAnswerSelected ? (answer.isValid ? "correct" : "") : ""
              }`}
              onClick={(e) => onAnswer(e, answer)}
            >
              {answer.text}
            </li>
          ))}
        </ul>
        <Divider />
        {isAnswerSelected && (
          <>
            <Typography.Text style={{ marginBottom: 10 }}>
              {question?.description}
            </Typography.Text>
            <button
              style={{ color: "rgb(30 81 245)", fontWeight: 500 }}
              onClick={() => navigate(-1)}
            >
              К списку вопросов
            </button>
          </>
        )}
      </Card>
    </div>
  );
};

export default Question;
