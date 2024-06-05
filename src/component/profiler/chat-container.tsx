'use client'
import { useTelegramContext } from "@/hook/use-telegram";
import { useWindow } from "@/hook/useWindow";
import { Box, Card, CardContent, Table, TableBody, TableCell, TableRow } from "@mui/material";
import FormCekNkk from "./formCekNkk";
import FormCekname from "./formCekname";
import FormCekNopol from "./formCekNopol";
import FormHpNik from "./formHpNik";
import FormNikHp from "./formNikHp";
import { useEffect, useRef } from "react";
import FormCekpos from "./formCekPos";
import FormCeknik from "./formCeknik";

const getMessage = (message: string) => {
    const cekPosMessage =message.split(' || ')
    if(cekPosMessage.length > 1) {
        const length =cekPosMessage.length
        let gmapLink = message[length - 1];
        gmapLink = gmapLink?.replace('http://', 'https://')

    const r =   {
            no: cekPosMessage[0],
            date: cekPosMessage[1],
            imei: cekPosMessage[2],
            imsi: cekPosMessage[3],
            lac: cekPosMessage[4],
            period: cekPosMessage[length - 3],
            address: cekPosMessage[length - 2],
            gmapLink
        }
    return <Card style={{width: 'auto'}}>
        <CardContent>
            No: &nbsp;
            {r.no} <br/>
            imei: &nbsp;
            {r.imei} <br/>
            imsi: &nbsp;
            {r.imsi} <br/>
            LAC: &nbsp;
            {r.lac} <br/>
            period: &nbsp;
            {r.period} <br/>
            Alamat: &nbsp;
            {r.address} <br/>
            Date: &nbsp;
            {r.date} <br/>
                <div className="mapouter" style={{
                    position: 'relative',
                    textAlign: 'right',height: 250,width: '100%',}
                }>
                    <div className="gmap_canvas" style={{
                        overflow: 'hidden',background: 'none !important',height: 250,width: '100%',
                    }}>
                        <iframe width="100%" height="250" id="gmap_canvas" src={`${r.gmapLink}&iwloc=&output=embed`} frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0}></iframe><a href="https://online.stopwatch-timer.net/pomodoro-timer">tomato timer</a>
                        <br/><a href="https://textcaseconvert.com"></a>
                        <br/>
                        <a href="https://www.ongooglemaps.com">google maps embed iframe</a></div></div>
        </CardContent>
        </Card>
    }
    
    const splitted = message.split('\n')
    if(splitted.length>1) {

        const ui = splitted.map((_m, index) => (
            <div key={index}>
                {_m}
            </div>
        ))
        return <Card style={{width: 'auto'}}>
        <CardContent>
            {ui}
            </CardContent>
        </Card>
    }
    return <Card style={{width: 'auto'}}>
        <CardContent>
            {message}
        </CardContent>
    </Card>
    
}
export default function ChatContainer() {
    const {
        messages
    } = useTelegramContext()
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if(ref){
            ref.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
            })
        }
    }, [messages])
    const { height } = useWindow()
    return <>
    <div className="flex" style={{ minWidth: 500 }}>
        <div className="w-100" style={{padding: 10}}>
            <b>Commands</b>
            <FormCekpos/><br/>
            <FormCekname/><br/>
            <FormCekNkk/><br/>
            <FormCekNopol/><br/>
            <FormHpNik/><br/>
            <FormNikHp/><br/>
            <FormCeknik/><br/>
        </div>
    <div style={{
        height: height,
        minWidth: 300,
        overflow: 'auto',
        flex:1,
        background: '#f1f1f1'
    }} ref={ref}>
            <div>
                {
                    messages.map(message => (
                        <div className='flex' style={{flexDirection: 'row-reverse', padding: 10}} key={message.id}>
                            
                                    {getMessage(message.message)}
                            
                        </div>
                            
                    ))
                }
                </div>
        </div>
    </div>
    </>
}