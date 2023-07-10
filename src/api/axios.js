import axios from "axios";

//const BASE_URL = process.env.REACT_APP_API
//const BASE_URL = "https://webapp-webvancy.azurewebsites.net/api"
//const BASE_URL = "https://api.appdevit.se/api"
//const BASE_URL = "https://localhost:7107/api"
const BASE_URL = "https://api.autofriendz.com/";

export default axios.create({
    baseURL: BASE_URL
});

const token = localStorage.getItem("token");
export const axiosPrivate = axios.create({    
    baseURL: BASE_URL,
    headers: { 
        "token": token,
        "Content-Type": "application/json", 
    },
})

