import React, { useEffect, useState } from "react";
import Header from "../../compoents/header/Header";
import LawsList from "../../compoents/lawsList/LawsList";
import Filters from "../../compoents/filters/Filters";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Filters setNumber={setNumber} setType={setType} />
      <LawsList number={number} type={type} />
    </div>
  );
};

export default Main;
