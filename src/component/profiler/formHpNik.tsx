import { useTelegram } from "@/hook/use-telegram";
import { Search } from "@mui/icons-material";
import { Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";

export default function FormHpNik() {
    const [phone, setPhone] = useState<string>('')
    const {
        sendMessage
    } = useTelegram()
    const handleClick = () => {
        sendMessage(`hpnik ${phone}`)
    }
    return (

        <div>
            <Typography variant="caption">
            Phone
            </Typography>
            <Typography variant="body1">
            Get NIK from phone number
            </Typography>
            <FormControl >
            <InputLabel htmlFor="outlined-adornment-password">Phone</InputLabel>
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