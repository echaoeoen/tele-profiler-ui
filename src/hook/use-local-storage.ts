import { Dispatch, SetStateAction, useState } from "react"

export const useLocalStorage = <T>(key: string, initialValue?: T) => {

    const [value, setValue] = useState<T>(() => {
        try {
            const jsonValue = localStorage.getItem(key)
            if(!jsonValue) return initialValue
            return JSON.parse(jsonValue)

        } catch (e) {
            return null
        }
    })
    const set: Dispatch<SetStateAction<T>> = (value) => {
        setValue(value)
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (e) { 
            // do nothing
        }
    }
    return {
        value, setValue: set
    }
}