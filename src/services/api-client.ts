// api-client.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.api-ninjas.com/v1", // Updated base URL
  headers: {
    "X-Api-Key": "sXf9ayuJ5QWTJakhwmERkw==12WYDOHpXMAzlgrI", // Replace 'YOUR_API_KEY' with your actual API key
    "Content-Type": "application/json",
  },
});

export default apiClient;
