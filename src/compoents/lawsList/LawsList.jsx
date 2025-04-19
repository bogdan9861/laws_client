import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, Spin, Tooltip, Progress, Flex } from "antd";

import service from "../../api/service";
import "./LawsList.scss";

const LawsList = ({ type, number }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getQuestions } = service();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getQuestions(number)
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [number]);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin />
      </div>
    );
  }

  return (
    <div className="container">
      <List
        className="list"
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={questions}
        renderItem={(question) => (
          <List.Item
            className="list__item"
            key={question.id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/question/${question.id}`)}
          >
            <h1 className="list__item-title">{question.title}</h1>
            <p className="list__item-text">{question.text}</p>

            <span className="list__item-number">
              №{`${question.document_number}`.replace("№", "")}
            </span>

            <span className="list__item-date">
              {question.date.split("T").shift().replaceAll("-", " ")}
            </span>

            <Progress
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
              }}
              strokeColor={"rgb(255 0 0)"}
              percent={question.passedPercent + question.failedPercent}
              success={{
                percent: question.passedPercent,
                strokeColor: "rgb(84 255 0)",
              }}
              type="circle"
              size="small"
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default LawsList;
