'use client'
import { Dispatch, SetStateAction, createContext, useCallback, useContext, useEffect, useState } from "react"
import { useRequest } from "./request"
import {
    useInterval
} from 'usehooks-ts'

const botTitle = process.env.BOT_TITLE || 'kopidarbucks'

export const useTelegram = () => {
    const {
        client, 
        loading: apiLoading,
        setLoading: setApiLoading
    } = useRequest();
    const [loading, setLoading] = useState(false);
    const [chatId, setChatId] = useState<number>();
    const [phone, setPhone] = useState<string>();
    const [lastMessageId, setLastMessageId] = useState<string>();
    const [cekPosMessage, setCekPosMessage] = useState<string>()
    const [profilingMessage, setProfilingMessage] = useState<string>()
    const [error, setError] = useState('')
    const [state, setState] = useState<string>('cek')
    const [delay, setDelay] = useState<number>(3000)
    const sendMessage = async (message: string) => {
        setLoading(true);
        try {
            const response = await client.post('/telegram/send-message', {
                to: chatId,
                message
            })
            return response.data;
        } catch (error: any) {
            setError(error.message)
        }
    }
    const cekPos = () => {
        if(!phone) return
        setState('cek')
        sendMessage(`Cek ${phone}`)
        setDelay(3000)
    } 
    const profiling = () => {
        if(!phone) return 
        setState('profiling')
        sendMessage(`Cekname ${phone}`)
        setDelay(3000)
    } 
    const getLatestMessage = useCallback(async () => {
        try {
            const response = await client.get(`/telegram/${chatId}?limit=1`)
            if(lastMessageId === response.data.messages[0]?.id) return
            setLastMessageId(response.data.messages[0]?.id)
            if(response.data.messages[0]?.message?.includes('Please wait')) {
                setError('Silahkan tunggu')
                return
            }
            if(response.data.messages[0]?.message?.includes('Cek')) {
                return
            }
            if(response.data.messages[0]?.message?.includes('Sorry')) {
                setError('Data tidak dapat ditemukan')
                setDelay(0);
            }
            if(state === 'cek') {
                console.log(cekPosMessage, response.data.messages[0]?.message)
                if (response.data.messages[0]?.message === cekPosMessage) return
                setCekPosMessage(response.data.messages[0]?.message)
                setDelay(0);
            }
            if(state === 'profiling') {
                if (response.data.messages[0]?.message === profilingMessage) return
                setProfilingMessage(response.data.messages[0]?.message)
                setDelay(0);
            }
        } catch (error: any) {
            setError(error.message)
        }
        setLoading(false)
    }, [cekPosMessage, chatId, client, profilingMessage, state])
    const getBotId = async () => {
        try {
            const response = await client.get('/telegram')
            const data = response.data as any[];
            const filtered = data.find((item) => item.title === botTitle)
            if (filtered) {
                setChatId(parseInt(filtered.id))
            } else setChatId(-1)
        } catch (error: any) {
            setError(error.message)
        }
    }
    useEffect(() => {
        getBotId()
    }, [])
    useInterval(() => {
        if(chatId) getLatestMessage();
    }, delay || null)
    // useEffect(() => {
    //     if(intervalRef) clearInterval(intervalRef)
    //     const interval = setInterval(async () => {
    //         getLatestMessage()
    //     }, 3000);
    //     setIntervalRef(interval)
    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [chatId])
    return {
        loading,
        error,
        sendMessage,
        setLoading,
        apiLoading,
        setApiLoading,
        chatId,
        cekPosMessage,
        profilingMessage,
        cekPos,
        profiling,
        setPhone,
        phone
    }
}

export const TelegramContext = createContext<ReturnType<typeof useTelegram>>({} as any)

export const TelegramContextProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const telegram = useTelegram();
    return (<TelegramContext.Provider value={telegram}>
        {children}
    </TelegramContext.Provider>
    )
}
export const useTelegramContext = () => useContext(TelegramContext);

