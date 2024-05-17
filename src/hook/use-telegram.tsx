'use client'
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useRequest } from "./request"
import {
    useInterval
} from 'usehooks-ts'
import { Snackbar, SnackbarContent } from "@mui/material"

const botTitle = process.env.BOT_TITLE || 'kopidarbucks'
export interface Message {
    id: number;
    message: string;
    
}
export const useTelegram = () => {
    const {
        client, 
        loading: apiLoading,
        setLoading: setApiLoading
    } = useRequest();
    const [loading, setLoading] = useState(false);
    const [chatId, setChatId] = useState<number>();
    const [phone, setPhone] = useState<string>();
    const [lastMessageId, setLastMessageId] = useState<string>()
    const [messages, setMessages] = useState<Message[]>([])
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
            setLoading(false)

            if(lastMessageId === response.data.messages[0]?.id) return
            if(messages.length > 5) {
                messages.slice(messages.length - 5, messages.length)
            }
            setMessages([...messages, {
                id: response.data.messages[0]?.id,
                message: response.data.messages[0]?.message || ''
            }])
            setLastMessageId(response.data.messages[0]?.id)
            if(response.data.messages[0]?.message?.includes('Please wait')) {
                setError('Please wait')
                return
            }
            if(response.data.messages[0]?.message?.includes('Cek')) {
                return
            }
            if(response.data.messages[0]?.message?.includes('Sorry')) {
                setError('No data found')
            }
            if(state === 'cek') {
                if (response.data.messages[0]?.message === cekPosMessage) return
                setCekPosMessage(response.data.messages[0]?.message)
            }
            if(state === 'profiling') {
                if (response.data.messages[0]?.message === profilingMessage) return
                setProfilingMessage(response.data.messages[0]?.message)
            }
        } catch (error: any) {
            console.log(error)
            setError(error.message)
        }
        setLoading(false)
    }, [client, chatId, lastMessageId, messages, state, cekPosMessage, profilingMessage])
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
        phone,
        messages,
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

export function LoadingBar(){
    const {
        loading,
        setLoading
    } = useTelegramContext()
    return  <Snackbar autoHideDuration={5000} message={'Loading'} content="" open={loading}/>
}