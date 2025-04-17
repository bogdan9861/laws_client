import axios from "axios";
import api from "./api";

const service = () => {
  const BASE_API = "http://publication.pravo.gov.ru/api";

  const getCurrentUser = async () => {
    return await api.get(`/users/`);
  };

  const login = async ({ phone, password }) => {
    return await api.post(`/users/login`, {
      phone,
      password,
    });
  };

  const register = async ({ name, phone, password }) => {
    return await api.post(`/users/register`, {
      name,
      phone,
      password,
    });
  };

  const createQuestion = async ({
    title,
    question,
    number,
    answers,
    description,
  }) => {
    return await api.post(`/questions`, {
      title,
      text: question,
      document_number: number,
      answers,
      description,
    });
  };

  const getQuestions = async (number) => {
    return await api.get(`/questions?number=${number || ""}`);
  };

  const removeQuestion = async (id) => {
    return await api.delete(`/questions/${id}`);
  };

  const getQuestionById = async (id) => {
    return await api.get(`/questions/${id}`);
  };

  return {
    getCurrentUser,
    register,
    login,
    createQuestion,
    getQuestions,
    getQuestionById,
    removeQuestion,
  };
};

export default service;
