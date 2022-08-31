import axios from "axios";

// const BASE = `http://localhost:8001`;
const BASE = `https://med-bio.herokuapp.com`;

const api = axios.create({
  baseURL: `${BASE}/v1/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "multipart/form-data",
  },
});

export default api;