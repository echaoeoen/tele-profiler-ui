import { Dispatch, SetStateAction, useState } from "react"

export const useLocalStorage = <T>(key: string, initialValue?: T) => {

    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if(!jsonValue) return initialValue
        return JSON.parse(jsonValue)
    })
    const set: Dispatch<SetStateAction<T>> = (value) => {
        setValue(value)
        localStorage.setItem(key, JSON.stringify(value))
    }
    return {
        value, setValue: set
    }
}