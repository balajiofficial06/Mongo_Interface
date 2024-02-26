import { Button, FormControl, Grid, Paper, TextField, styled } from '@mui/material'
import React from 'react'

function PutData({ columns }) {



    const Wapper = styled('div')(() => ({
        display: "flex",
        direction: "row",
        alignItems: "center",
        justifyContent: "center",

    }))


    const Item = styled("div")(() => ({
        padding: 2,
        textAlign: 'center',
    }));

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)

    }

    // const [userId, setUserId] = useState('');
    // const [subscriptionType, setSubscriptionType] = useState('');
    // const [monthlyRevenue, setMonthlyRevenue] = useState('');
    // const [joinDate, setJoinDate] = useState('');
    // const [lastPaymentDate, setLastPaymentDate] = useState('');
    // const [country, setCountry] = useState('');
    // const [age, setAge] = useState('');
    // const [gender, setGender] = useState('');
    // const [device, setDevice] = useState('');
    // const [planDuration, setPlanDuration] = useState('');


    const fields = columns.data
    return (
        <>
            <Wapper>

                <FormControl onSubmit={handleSubmit}>
                    <Grid container rowSpacing={5} columnSpacing={2} rowGap={4}>
                        {fields.map((value, index) => (
                            <Grid lg={3}>
                                <Item>
                                    <TextField key={index} label={value} />
                                </Item>
                            </Grid>
                        ))}

                    </Grid>
                    <Button variant='outlined' type='submit' >Create</Button>
                </FormControl>
            </Wapper>
        </>
    )
}

export default PutData