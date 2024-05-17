import { useTelegram } from "@/hook/use-telegram";
import { Search } from "@mui/icons-material";
import { Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";

export default function FormCekNopol() {
    const [Nopol, setNopol] = useState<string>('')
    const {
        sendMessage
    } = useTelegram()
    const handleClick = () => {
        sendMessage(`Ceknopol ${Nopol}`)
    }
    return (

        <div>
            <Typography variant="caption">
            Vihacle Registration Number
            </Typography>
            <Typography variant="body1">
            Get information from Vihacle Registration Number
            </Typography>
            <FormControl >
            <InputLabel htmlFor="outlined-adornment-password">Vihacle Registration Number</InputLabel>
            <OutlinedInput
                onChange={(e) => setNopol(e.target.value)}
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