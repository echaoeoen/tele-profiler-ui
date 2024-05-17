import { useTelegramContext } from "@/hook/use-telegram";
import { Search } from "@mui/icons-material";
import { Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";

export default function FormCekname() {
    const [phone, setPhone] = useState<string>('')
    const {
        sendMessage
    } = useTelegramContext()
    const handleClick = () => {
        sendMessage(`Cekname ${phone}`)
    }
    return (

        <div>
            <Typography variant="caption">
            Check name
            </Typography>
            <Typography variant="body1">
            Get all information from phone
            </Typography>
            <FormControl >
            <InputLabel htmlFor="outlined-adornment-password">phone</InputLabel>
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