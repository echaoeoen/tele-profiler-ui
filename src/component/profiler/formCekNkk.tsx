import { useTelegram } from "@/hook/use-telegram";
import { Search } from "@mui/icons-material";
import { Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";

export default function FormCekNkk() {
    const [nkk, setnkk] = useState<string>('')
    const {
        sendMessage
    } = useTelegram()
    const handleClick = () => {
        sendMessage(`Ceknkk ${nkk}`)
    }
    return (

        <div>
            <Typography variant="caption">
            NKK
            </Typography>
            <Typography variant="body1">
            Get all family member from NKK
            </Typography>
            <FormControl >
            <InputLabel htmlFor="outlined-adornment-password">nkk</InputLabel>
            <OutlinedInput
                onChange={(e) => setnkk(e.target.value)}
                id="outlined-adornment-password"
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClick}
                    edge="end"
                    ><Search />
                    </IconButton>
                </InputAdornment>
                }
            />
            </FormControl>
        </div>
    )
}