import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("laws-token")) {
      navigate("/login");
    }
  }, []);
};

export default Redirect;
