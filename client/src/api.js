import axios from "axios";

const API = axios.create({
  baseURL: "https://curly-xylophone-jjj7r5qj6649354x4-5000.app.github.dev/api",
  withCredentials: true
});

export default API;
