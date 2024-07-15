import { atom, useAtom} from 'jotai'

const errorAtom = atom('')
export const useGlobalError = () => {
    const [error, setError] = useAtom(errorAtom);
    return {
        error,
        setError
    }
}