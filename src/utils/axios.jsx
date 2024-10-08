import axios from "axios";
import { saveAccessToken, saveLogged } from "./storage";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_REQUEST_URI,
    withCredentials: true,
    headers: {
        "Authorization": localStorage.getItem('token'),
    }
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    config.headers.Authorization=token || null;
    return config;
})

axiosInstance.interceptors.response.use((response) => {
    if(!!response.headers['authorization']){
        saveAccessToken(response.headers['authorization']);
    }

    return response;
})