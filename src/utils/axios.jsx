import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_REQUEST_URI,
    withCredentials: true,
    headers: {
        "Authorization": localStorage.getItem('token')
    }
});