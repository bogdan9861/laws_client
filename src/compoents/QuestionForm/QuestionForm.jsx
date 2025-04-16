import React, { useState } from "react";
import { Button, Card, Divider, Input as AntdInput } from "antd";

import Input from "../input/Input";
import service from "../../api/service";
import "../../pages/Profile/Profile.scss";

const QuestionForm = ({ questions, setQuestions }) => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const { createQuestion } = service();

  const addAnswer = (text) => {
    if (!answer) return;

    setAnswers([...answers, { isValid: false, text }]);
    setAnswer("");
  };

  const onDelete = (i) => {
    const newArr = answers.filter((answer, index) => index !== i);

    setAnswers(newArr);
  };

  const setValidAnswer = (i) => {
    let arr = answers;

    arr.forEach((el) => {
      el.isValid = false;
    });

    arr[i].isValid = !arr[i].isValid;

    setAnswers([...arr]);
  };

  const onCreateQuestion = () => {
    createQuestion({ title, number, question, answers, description }).then(
      (res) => {
        setTitle("");
        setNumber("");
        setQuestion("");
        setDescription("");
        setAnswers([]);

        setQuestions([
          { title, text: question, document_number: number },
          ...questions,
        ]);
      }
    );
  };

  return (
    <Card className="profile__window" title={"Создать тест"}>
      <span
        style={{
          marginBottom: 8,
          marginLeft: 5,
          display: "block",
          color: "rgba(0,0,0,0.65)",
        }}
      >
        Заголовок вопроса
      </span>
      <Input
        placeholder="Введите текст"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <span
        style={{
          marginBottom: 8,
          marginLeft: 5,
          display: "block",
          color: "rgba(0,0,0,0.65)",
        }}
      >
        Вопрос
      </span>
      <Input
        placeholder="Введите текст"
        onChange={(e) => setQuestion(e.target.value)}
        value={question}
      />

      <span
        style={{
          marginBottom: 8,
          marginLeft: 5,
          display: "block",
          color: "rgba(0,0,0,0.65)",
        }}
      >
        Номер документа
      </span>
      <Input
        placeholder="Введите номер"
        onChange={(e) => setNumber(e.target.value)}
        value={number}
      />
      <span
        style={{
          marginBottom: 8,
          marginLeft: 5,
          display: "block",
          color: "rgba(0,0,0,0.65)",
        }}
      >
        Описание правильного ответа
      </span>
      <AntdInput.TextArea
        placeholder="Введите текст"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        style={{ height: 120, resize: "none" }}
      />

      <Divider />
      <div className="answer__input-wrapper">
        <Input
          className="answer__input"
          placeholder="Вариант ответа"
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
        />
        <button className="answer__btn" onClick={() => addAnswer(answer)}>
          <img
            className="answer__input-img"
            src="https://img.icons8.com/?size=100&id=114100&format=png&color=32D233"
            alt=""
          />
        </button>
      </div>
      <ul className="answer__list">
        {answers.map((answer, i) => (
          <li className="answer__item-wrapper">
            <button
              className={`answer__item ${answer.isValid ? "correct" : ""}`}
              onClick={() => setValidAnswer(i)}
            >
              <span>{answer.text}</span>
            </button>
            <button className="answer__delete" onClick={() => onDelete(i)}>
              <img
                width={20}
                src="https://img.icons8.com/?size=100&id=68064&format=png&color=E23939"
                alt=""
              />
            </button>
          </li>
        ))}
      </ul>
      <Button type="primary" onClick={onCreateQuestion}>
        Создать
      </Button>
    </Card>
  );
};

export default QuestionForm;
