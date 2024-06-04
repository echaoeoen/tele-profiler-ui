
'use client'
import { FormControl } from "@mui/base";

import { Card, CardContent, IconButton, InputAdornment, InputLabel, OutlinedInput, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useTelegramContext } from "@/hook/use-telegram";
export default function Geolocation(){
    const {
        cekPos,
        setPhone,
        cekPosMessage,
    } = useTelegramContext()
  const handleClick = () => {
    cekPos()
  }
  const parseCheckpos = () => {
    const message = cekPosMessage?.split('||');
    const length = message?.length as number;
    if (message) {
        let gmapLink = message[length - 1];
        gmapLink = gmapLink?.replace('http://', 'https://')
        return {
            no: message[0],
            date: message[1],
            imei: message[2],
            imsi: message[3],
            lac: message[4],
            period: message[length - 3],
            address: message[length - 2],
            gmapLink
        }
    }
  }
    return (
    <div>
        <div>
            <Card>
                <CardContent>
                    <Typography variant="caption">
                    Phone
                    </Typography>
                    <Typography variant="body1">
                    Pencarian data pengguna berdasarkan nomor telepon
                    </Typography>
                    <FormControl >
                    <InputLabel htmlFor="outlined-adornment-password">Nomor Handphone</InputLabel>
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
                </CardContent>
            </Card>
        </div>
        {
            cekPosMessage &&
            <div>
                <Card>
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    No
                                </TableCell>
                                <TableCell>
                                    {parseCheckpos()?.no}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    imei
                                </TableCell>
                                <TableCell>
                                    {parseCheckpos()?.imei}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    imsi
                                </TableCell>
                                <TableCell>
                                    {parseCheckpos()?.imsi}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    LAC
                                </TableCell>
                                <TableCell>
                                    {parseCheckpos()?.lac}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    period
                                </TableCell>
                                <TableCell>
                                    {parseCheckpos()?.period}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Alamat
                                </TableCell>
                                <TableCell>
                                    {parseCheckpos()?.address}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Date
                                </TableCell>
                                <TableCell>
                                    {parseCheckpos()?.date}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                        <div className="mapouter" style={{
                            position: 'relative',
                            textAlign: 'right',height: 560,width: 820,}
                        }>
                            <div className="gmap_canvas" style={{
                                overflow: 'hidden',background: 'none !important',height: 560,width: 820,
                            }}>
                                <iframe width="820" height="560" id="gmap_canvas" src={`${parseCheckpos()?.gmapLink}&iwloc=&output=embed`} frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0}></iframe><a href="https://online.stopwatch-timer.net/pomodoro-timer">tomato timer</a>
                                <br/><a href="https://textcaseconvert.com"></a>
                                <br/>
                                <a href="https://www.ongooglemaps.com">google maps embed iframe</a></div></div>
                </CardContent>
                </Card>
            </div>
        }
    </div>
    )
}