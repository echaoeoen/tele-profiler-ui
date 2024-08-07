'use client';
import { useProfiler } from "@/hook/use-profiler";
import { Box, Button, CircularProgress, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Input } from "@mui/material";
import { ChangeEventHandler, useEffect, useState } from "react";

export default function ProfilerPage() {
    const [type, setType] = useState('nik');
    const [value, setValue] = useState('');
    const [limit, setLimit] = useState(10);
    const [domisili, setDomisili] = useState('');
    const {
        getBpjs,
        getName,
        getNameDomisili,
        getNik,
        getNkk,
        getPassport,
        getVisa,
        loading,
        response,
        setResponse,
        manualFR,
        manualText
    } = useProfiler();
    useEffect(() => {
        setResponse([]);
    }, [type, setResponse])
    const submit = () => {
        switch (type) {
            case 'nik':
                getNik(value);
                break;
            case 'nkk':
                getNkk(value);
                break;
            case 'name':
                getName(value, limit);
                break;
            case 'name-domisili':
                getNameDomisili(value, domisili);
                break;
            case 'bpjs':
                getBpjs(value);
                break;
            case 'passport':
                getPassport(value);
                break;
            case 'visa':
                getVisa(value);
                break;
            case 'image':
                manualFR(selectedFile);
                break;
            case 'manual':
                manualText(value);
                break;
        }
    }

  const [selectedFile, setSelectedFile] = useState<string>('');

  const handleFileChange: ChangeEventHandler<any> = (event) => {
    if(!event.target?.files[0]) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.target?.files[0]);
    fileReader.onload = () => {
        if(!fileReader.result)
            return
        const result = fileReader.result?.toString().replace(/^data:image\/[a-z]+;base64,/, '');
        setSelectedFile(result)
    };
  };

    return (
        <Box>
            <Typography variant="h5">Profiler V2</Typography>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <MenuItem value={'nik'}>Nik</MenuItem>
                <MenuItem value={'name'}>Name</MenuItem>
                <MenuItem value={'nkk'}>NKK</MenuItem>
                <MenuItem value={'bpjs'}>BPJS</MenuItem>
                <MenuItem value={'name-domisili'}>Name domisili</MenuItem>
                <MenuItem value={'passport'}>Passport</MenuItem>
                <MenuItem value={'visa'}>Visa</MenuItem>
                <MenuItem value={'manual'}>Manual</MenuItem>
                <MenuItem value={'image'}>FR</MenuItem>
            </Select>

            </FormControl>
            {
                type === 'image' && <Input
                  type="file"
                  onChange={handleFileChange}
                  inputProps={{ accept: 'image/*' }} // optional, specify file types
                />
            }
            {
                type !== 'image' && <TextField id="outlined-basic"
             label={type} 
             value={value}
             onChange={(e) => setValue(e.target.value)}
             variant="outlined" />
            
            }           
            {
                type === 'name' && (
                    <TextField id="outlined-basic"
                    label="Limit" 
                    value={limit}
                    onChange={(e) => setLimit(parseInt(e.target.value))}
                    type="number"
                    variant="outlined" />
                )
            }
            {
                type === 'name-domisili' && (
                    <TextField 
                        id="outlined-basic"
                        label="Domisili" 
                        variant="outlined"
                        value={domisili}
                        onChange={(e) => setDomisili(e.target.value)}
                        />
                )
            }
            <br/>
            <Button disabled={loading} onClick={submit} variant="contained">
                {loading ? <CircularProgress/> : 'Submit'}

            </Button>
            <br/>
            {
                response.map((item, index) => <>
                    <Box key={index}>
                        {
                            item.image && <><img src={`data:image/jpeg;base64,${item.image}`} alt={item.message} /><br/><br/></>
                        }
                        <Typography>{
                        item.message.split('\n').map((item, index) => <span key={index}>{item}<br/></span>)
                        }</Typography>
                    </Box>
                    <Divider />
                    </>
                )
            }
        </Box>

    )
}