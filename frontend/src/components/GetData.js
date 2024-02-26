import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useAuthenticatedDataFetch from '../utils/useAuthenticatedDataFetch'
import { TableContainer, TableBody, Table, TableRow, TableCell, TableHead, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';

// import { DataGrid } from '@mui/x-data-grid';




function GetData({ columns }) {

    const [data, error] = useAuthenticatedDataFetch("http://127.0.0.1:8000/crud", 'get', {}, "/signin")
    const row = columns.data
    console.log(row)
    // const headCol = [row.map((col) => ({ "feild": col, "headerName": col }))]
    // console.log(headCol, data)

    return <>
        {/* {data && <div style={{ height: 400, width: '100%' }}>

            <DataGrid
                rows={data}
                columns={headCol}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>} */}
        <TableContainer component={Paper} style={{ width: "70vw", height: "70vh" }} >
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