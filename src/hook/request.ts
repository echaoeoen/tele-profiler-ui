import { useState } from "react"
import axios from 'axios'
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/';
export const useRequest = () => {
    const [loading, setLoading] = useState(false);
    const client = axios.create({
        baseURL: API_URL
    })
    client.interceptors.request.use((config) => {
        setLoading(true);
        return config;
    })
    client.interceptors.response.use((response) => {
        setLoading(false);
        return response;
    }, (error) => {
        setLoading(false);
        return Promise.reject(error);
    })
    return {
        client, loading, setLoading
    }
}