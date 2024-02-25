import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useAuthenticatedDataFetch from '../utils/useAuthenticatedDataFetch'
import { TableContainer, TableBody, Table, TableRow, TableCell, TableHead, Paper } from '@mui/material'
// import { DataGrid } from '@mui/x-data-grid';




function GetData({ columns }) {

    const [data, error] = useAuthenticatedDataFetch("http://127.0.0.1:8000/crud", "/signin")
    console.log(data)
    const row = columns.data
    console.log(data)
    return <>
        <TableContainer component={Paper} style={{ width: "70vw" }} >
            <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {row && row.map((rowName, index) => (<TableCell align="right" key={index}>{rowName}</TableCell>))}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.map((row, index) => (
                        <TableRow
                            key={row.index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row["User ID"]}
                            </TableCell>
                            <TableCell align="right">{row["Subscription Type"]}</TableCell>
                            <TableCell align="right">{row["Monthly Revenue"]}</TableCell>
                            <TableCell align="right">{row["Join Date"]}</TableCell>
                            <TableCell align="right">{row["Last Payment Date"]}</TableCell>
                            <TableCell align="right">{row["Country"]}</TableCell>
                            <TableCell align="right">{row["Age"]}</TableCell>
                            <TableCell align="right">{row["Gender"]}</TableCell>
                            <TableCell align="right">{row["Device"]}</TableCell>
                            <TableCell align="right">{row["Plan Duration"]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    </>

}

export default GetData