import { Input, Select } from "antd";
import React, { useEffect, useState } from "react";

import "./Filters.scss";
import service from "../../api/service";

const Filters = ({ setNumber, setType }) => {
  const [types, setTypes] = useState([]);

  const { getDocumentTypes } = service();

  useEffect(() => {
    getDocumentTypes().then((res) => {
      setTypes(res.data);
    });
  }, []);

  return (
    <div className="filters">
      <div className="container">
        <div className="filters__inner">
          <Input
            className="filters__input"
            placeholder="Поиск по номеру документа"
            onChange={(e) => setNumber(e.target.value)}
          />
          <Select
            defaultValue={{
              label: "Постановление",
              value: "fd5a8766-f6fd-4ac2-8fd9-66f414d314ac",
            }}
            onChange={(value) => setType(value)}
          >
            {types.map((el) => (
              <Select.Option value={el.id}>{el.name}</Select.Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
