import { useTelegramContext } from "@/hook/use-telegram";
import { Search } from "@mui/icons-material";
import { Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";

export default function FormNikHp() {
    const [nik, setNik] = useState<string>('')
    const {
        sendMessage
    } = useTelegramContext()
    const handleClick = () => {
        sendMessage(`hpnik ${nik}`)
    }
    return (
        <div>
            <Typography variant="caption">
            NIK
            </Typography>
            <Typography variant="body1">
            Get phone number from NIK
            </Typography>
            <FormControl >
            <InputLabel htmlFor="outlined-adornment-password">Nik</InputLabel>
            <OutlinedInput
                onChange={(e) => setNik(e.target.value)}
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