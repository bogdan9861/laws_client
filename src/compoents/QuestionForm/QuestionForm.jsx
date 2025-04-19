import React, { useEffect, useState } from "react";
import { Button, Card, Divider, Input as AntdInput, Modal } from "antd";

import Input from "../input/Input";
import service from "../../api/service";
import { getEnglishLetter } from "../../utils/getEnglishLetter";

import "../../pages/Profile/Profile.scss";
import "./QuestionForm.scss";

const QuestionForm = ({ questions, setQuestions, open, setOpen }) => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isValidSelected, setIsValidSelected] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [isShown, setIsShown] = useState(false);

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

  const setValidAnswer = ({ i, answer }) => {
    let arr = answers;

    setDescription(
      `Правильный ответ: ${getEnglishLetter(i).toUpperCase()}) ` + answer.text
    );

    arr.forEach((el) => {
      el.isValid = false;
    });

    arr[i].isValid = !arr[i].isValid;

    setAnswers([...arr]);
    setIsValidSelected(true);
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
          { id: res.data.id, title, text: question, document_number: number },
          ...questions,
        ]);
      }
    );

    setOpen(false);
  };

  useEffect(() => {
    setDisabled(
      !title || !question || !number || answers.length < 2 || !isValidSelected
    );
  }, [title, question, number, description, answer, answers]);

  return (
    <Modal
      title="Создайте вопрос"
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
    >
      <div className={`questionForm ${isShown ? "questionForm--shown" : ""}`}>
        <span
          style={{
            marginTop: 20,
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
          type="number"
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
                onClick={() => setValidAnswer({ answer, i })}
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
        <Button
          style={{ width: 150, height: 40 }}
          type="primary"
          onClick={onCreateQuestion}
          disabled={disabled}
        >
          Создать
        </Button>
      </div>
    </Modal>
  );
};

export default QuestionForm;
