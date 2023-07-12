import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.autofriendz.com/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://autofriendz.com",
  },
});

export default instance;
