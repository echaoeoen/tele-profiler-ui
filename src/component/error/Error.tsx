'use client'
import { Snackbar } from "@mui/material";
import { useGlobalError } from "../../hook/use-error";

export default function Error(){
    const {error, setError} = useGlobalError()
    return <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={ () => setError('') }
        message={error}
    />
}