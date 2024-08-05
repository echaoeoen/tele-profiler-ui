
import { useCallback, useState } from 'react';
import { useRequest } from './request'
import { useGlobalError } from './use-error';
import { useLocalStorage } from './use-local-storage';
export interface ProfilerResponse {
    message: string;
    image: string;
}
export const useProfiler = () => {
    const {
        client,
        loading,
    } = useRequest();
    const [response, setResponse] = useState<ProfilerResponse[]>([])
    const { setError } = useGlobalError()
    const req = (path: string, data: any) => {
        client.post(path, data).then((response) => {
            setResponse(response.data.response)
        }).catch(err => setError(err.response?.data?.message || err.message))
    } 
    const getNik = (nik: string) => {
        return req('/bot2/v2/profiler/nik', { nik })
    }
    const getNkk = (nkk: string) => {
        return req('/bot2/v2/profiler/nkk', { nkk })
    }
    const getName = (name: string, limit: number) => {
        return req('/bot2/v2/profiler/nkk', { name, limit })
    }

    const getNameDomisili = (name: string, dom: string) => {
        return req('/bot2/v2/profiler/domisili', { name, dom })
    }

    const getBpjs = (bpjs: string) => {
        return req('/bot2/v2/profiler/bpjs', { bpjs })
    }

    const getPassport = (passport: string) => {
        return req('/bot2/v2/profiler/passport', { passport })
    }
    const getVisa = (visa: string) => {
        return req('/bot2/v2/profiler/visa', { visa })
    }

    return {
        response,
        setResponse,
        loading,
        getNik,
        getNkk,
        getName,
        getNameDomisili,
        getBpjs,
        getPassport,
        getVisa,
    }
}