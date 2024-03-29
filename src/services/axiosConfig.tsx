import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com/search",
  headers: {
    Accept: "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

export default api;
