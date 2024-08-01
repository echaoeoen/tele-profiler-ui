import { useState } from "react"
import axios from 'axios'
import { useRouter } from "next/navigation";
import { useToken } from './use-login'
import { useGlobalError } from "./use-error";
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/bot1';
const XToken = process.env.NEXT_PUBLIC_X_TOKEN || 'asdfASDF1234!@#$'
export const useRequest = () => {
    const [loading, setLoading] = useState(false);
    const { value: token } = useToken()
    const route = useRouter()
    const { setError } = useGlobalError()
    const client = axios.create({
        baseURL: API_URL
    })
    client.interceptors.request.use((config) => {
        setLoading(true);
        config.headers['Authorization'] = token || undefined
        config.headers['X-Token'] = XToken
        return config;
    })
    client.interceptors.response.use((response) => {
        setLoading(false);
        return response;
    }, (error) => {
        setLoading(false);
        if(error.response?.status === 403) {
            route.push('/login')
        }
        setError(error.response?.data?.message || error.message)
        return Promise.reject(error);
    })
    return {
        client, loading, setLoading
    }
}