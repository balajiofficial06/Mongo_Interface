import { Box, Button, FormControl, Grid, Paper, TextField, styled } from '@mui/material'
import React, { useState } from 'react'
import { axiosMethods } from '../utils/useAxiosMethos';
import toast from 'react-hot-toast';


function PutData({ columns }) {


    const Wapper = styled('div')(() => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

    }))

    const WapperGrid = styled('div')(() => ({
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "space-between",
        gap: "30px"

    }))


    const Item = styled("div")(() => ({
        padding: 2,
        textAlign: 'center',
    }));

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get("email"))

        const submitData = {}
        Object.entries(columns).forEach(([key, value]) => {
            submitData[key] = data.get(key);
        });
        const respons = await axiosMethods("http://127.0.0.1:8000/crud", "post", { "data": submitData })
        if (respons.request.status == 200) {
            toast.success(respons.data.message)

        } else {
            toast.error("Unable to insert the document")
        }
    };



    return (

        <Wapper>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <WapperGrid>
                    <Grid container rowSpacing={5} columnSpacing={2} rowGap={4} style={{ justifyContent: "center" }} >
                        {columns && Object.keys(columns).map((colname, index) => (<Grid key={index} item xl={3}>
                            <TextField
                                key={index}
                                margin="normal"
                                fullWidth
                                id={colname}
                                label={colname}
                                name={colname}
                                autoComplete={colname}
                                autoFocus
                            />
                        </Grid>
                        ))}

                    </Grid>
                    <Button variant='outlined' type='submit'>Create</Button>
                </WapperGrid>
            </Box>
        </Wapper>
    )
}

export default PutData