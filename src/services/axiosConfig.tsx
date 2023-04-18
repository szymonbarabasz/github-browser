import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com/search",
  headers: {
    Accept: "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2022-11-28",
    Authorization:
      "token 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",
  },
});

export default api;
