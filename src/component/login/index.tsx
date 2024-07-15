
'use client'
import { Button, Card, CardContent, CircularProgress, Input, Stack, TextField } from "@mui/material";
import { useLogin } from "../../hook/use-login";
import Error from "../error/Error";
import { useRouter } from "next/navigation";

export default function Login(){
    const {
        login,
        loading,
        username,
        password,
        setUsername,
        setPassword
    } = useLogin()
    const route = useRouter()
    const doLogin = async () => {
        const loggedIn = await login()
        console.log({loggedIn})
        loggedIn && route.push('/app')
    }
    return <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: 1, height: "100vh" }}
        >
        <Card>
            <CardContent>
                <div>
                <TextField
                label="Username"
                    id="filled-hidden-label-small"
                    variant="filled"
                    size="small"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    />
                </div>
                <br/>
                <div>
                <TextField
                label="Password"
                    id="filled-hidden-label-small"
                    variant="filled"
                    size="small"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    />
                </div>
                <br/>
                <Button variant="contained" onClick={doLogin}>{loading ? <CircularProgress size={20}/> : 'Login'}</Button>
            </CardContent>

        </Card>
            <Error/>
    </Stack>
}