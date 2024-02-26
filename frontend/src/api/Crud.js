import styled from '@emotion/styled';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import GetData from '../components/GetData';
import PutData from '../components/PutData';
import PostData from '../components/PostData';
import DeleteData from '../components/Delete';
import useAuthenticatedDataFetch from '../utils/useAuthenticatedDataFetch';

const Wapper = styled('div')(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
}))

const Seperater = styled('div')(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",

}))



const Crud = () => {
    const [method, setMethod] = useState('None')


    const [data, error] = useAuthenticatedDataFetch("http://127.0.0.1:8000/cols", 'get', {}, "/sigin")

    const handelChange = (e) => {
        setMethod(e.target.value)
    }

    return <Wapper>
        <Seperater style={{ width: "30vw" }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Action</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={method}
                    label="Action"
                    onChange={handelChange}
                >
                    <MenuItem value='get'>Get data</MenuItem>
                    <MenuItem value='post'>Create record</MenuItem>
                    <MenuItem value='update'>Update data</MenuItem>
                    <MenuItem value='delete'>Delete record</MenuItem>
                </Select>
            </FormControl>
        </Seperater>
        <Seperater style={{ width: "100vw" }}>
            {(method === 'get') && <GetData columns={data} />}
            {(method === 'post') && <PostData columns={data} />}
            {(method === 'update') && <PutData columns={data} />}
            {(method === 'delete') && <DeleteData columns={data} />}

        </Seperater>

    </Wapper>
};

export default Crud;