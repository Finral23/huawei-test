import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.api-ninjas.com/v1",
  headers: {
    "X-Api-Key": "sXf9ayuJ5QWTJakhwmERkw==12WYDOHpXMAzlgrI",
    "Content-Type": "application/json",
  },
});

export default apiClient;
