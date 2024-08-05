/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { useRequest } from './request'
import { useGlobalError } from './use-error';
import { useLocalStorage } from './use-local-storage';
export const useToken = () => useLocalStorage<string>('token')
export const useLogin = () => {
    const {
        client,
        loading
    } = useRequest();
    const { setError } = useGlobalError()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { setValue: setToken } = useToken()
    const login = useCallback(() => {
        if(loading) return;
        setError('')
        return client.post('/bot1/login', {
            username,
            password
        }).then((response) => {
            setToken(response.data?.token)
            return true
        }).catch(err => {
            setError(err.response?.data?.message || err.message)
            return false
        })
        
    }, [
        username,
        password
    ])

    return {
        username,
        password,
        setUsername,
        setPassword,
        login,
        loading,
    }
}