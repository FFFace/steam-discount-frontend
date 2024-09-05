import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.REQUEST_URI,
    withCredentials: true,
});