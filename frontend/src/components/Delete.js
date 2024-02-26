import { Button, ButtonBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { axiosMethods } from '../utils/useAxiosMethos';
import toast from 'react-hot-toast';





const Wapper = styled('div')(() => ({
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: "center",
    padding: '2px',
    height: "100vh",
    gap: "50px"

}))

const Findbar = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    padding: '2px',
    gap: "30px"

}))

const DeleteButtonDiv = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "end",
    padding: '2px',
    gap: "10px"

}))
function Delete() {

    const [searchValue, setSearchValue] = useState('')
    const [objectID, setObjectID] = useState('')
    const [delButton, setDelButton] = useState(false)
    const [data, setData] = useState({})

    const findData = async () => {

        try {
            const userId = searchValue
            console.log(userId)

            const respons = await axiosMethods(`http://127.0.0.1:8000/crud/${userId}`, "get", {})
            // const respons = await axios.get(`http://127.0.0.1:8000/crud/${userId}`, {headers : {
            //     'Authorization': `Bearer`
            // }})

            if (respons.data.data) {
                setData(respons.data.data)
                setObjectID(respons.data.data._id)
                setDelButton(true)
                console.log(data)
            } else {
                toast.error(respons.data.message)
            }
        }
        catch (err) {
            toast.error("somthing went wrong")
        }
    }

    const handleDelete = async () => {

        try {
            const respons = await axiosMethods(`http://127.0.0.1:8000/crud/${objectID}`, "delete", {})
            setData('')
            setDelButton(false)
            toast.success(respons.data.message)
        } catch (err) {
            console.log(err)
            toast.error("somthing went wrong")
        }

    }
    return (
        <Wapper>
            <Findbar>
                <TextField label='Enter the user ID' onChange={e => setSearchValue(e.target.value)} />
                <Button variant='outlined' onClick={findData}>Find </Button>
            </Findbar>
            {data && <TableContainer component={Paper} >
                <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
                    <TableHead>
                        {data && Object.entries(data).map((row, index) => (
                            <TableRow>
                                <TableCell align="left" key={index}>{row[0]}</TableCell>
                                <TableCell align="left">{row[1]}</TableCell>
                            </TableRow>
                        ))}

                    </TableHead>
                </Table>
            </TableContainer>}
            {delButton && <DeleteButtonDiv>
                <Button onClick={handleDelete}>Delete</Button>
            </DeleteButtonDiv>}
        </Wapper>
    )
}

export default Delete