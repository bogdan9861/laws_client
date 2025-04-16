import React, { useEffect, useState } from "react";
import service from "../../api/service";
import { List, Spin } from "antd";
import { useDebounce } from "use-debounce";

import "./LawsList.scss";

const LawsList = ({ type, number }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getDocuments } = service();

  useEffect(() => {
    setLoading(true);
    getDocuments({ type, number })
      .then((res) => {
        setDocuments(res.data.items);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [type, number]);

  const data = documents.map((el, i) => ({
    title: el.title.replace("<br/>", "\n").replace("<br />", "\n"),
    description: `№${el.number} от ${el.viewDate}`,
    content: el.name,
  }));

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
          pageSize: 10,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item className="list__item" key={item.title}>
            <List.Item.Meta
              title={<p style={{ fontSize: 17 }}>{item.title}</p>}
              description={item.description}
              children={<span>123</span>}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
};

export default LawsList;
