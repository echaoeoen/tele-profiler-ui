import { useTelegramContext } from "@/hook/use-telegram";
import { Search } from "@mui/icons-material";
import { Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";

export default function FormCeknik() {
    const [nik, setPhone] = useState<string>('')
    const {
        sendMessage
    } = useTelegramContext()
    const handleClick = () => {
        sendMessage(`Ceknik ${nik}`)
    }
    return (

        <div>
            <Typography variant="caption">
            Check nik
            </Typography>
            <Typography variant="body1">
            Get nik information
            </Typography>
            <FormControl >
            <InputLabel htmlFor="outlined-adornment-password">nik</InputLabel>
            <OutlinedInput
                onChange={(e) => setPhone(e.target.value)}
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