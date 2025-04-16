import axios from "axios";
import api from "./api";

const service = () => {
  const BASE_API = "http://publication.pravo.gov.ru/api";
  const BASE_URL = "http://localhost:8080/api";

  const getDocuments = async ({ type, number }) => {
    return await api.get(
      `${BASE_API}/Documents?DocumentTypes=${
        type || "fd5a8766-f6fd-4ac2-8fd9-66f414d314ac"
      }&NumberSearchType=0&Number=${number}`
    );
  };

  const getDocumentTypes = async () => {
    return await api.get(
      `${BASE_API}/DocumentTypes?SignatoryAuthorityId=8005d8c9-4b6d-48d3-861a-2a37e69fccb3`
    );
  };

  const getCurrentUser = async () => {
    return await api.get(`${BASE_URL}/users/`);
  };

  const login = async ({ phone, password }) => {
    return await api.post(`${BASE_URL}/users/login`, {
      phone,
      password,
    });
  };

  const register = async ({ name, phone, password }) => {
    return await api.post(`${BASE_URL}/users/register`, {
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
    return await api.post(`${BASE_URL}/questions`, {
      title,
      text: question,
      document_number: number,
      answers,
      description,
    });
  };

  const getQuestions = async () => {
    return await api.get(`${BASE_URL}/questions`);
  };

  const removeQuestion = async (id) => {
    return await api.delete(`${BASE_URL}/questions/${id}`);
  };

  const getQuestionById = async (id) => {
    return await api.get(`${BASE_URL}/questions/${id}`);
  };

  return {
    getDocuments,
    getDocumentTypes,
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
