import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer';
import Sidenav from '../../Components/Sidenav';
import { Link, useParams } from "react-router-dom";



export default function GetFlatList() {
    var [Flat, setFlat] = useState([]);
    var { id } = useParams()
    useEffect(() => { getFlatList() }, [])
    const getFlatList = () => {
        var helper = new XMLHttpRequest()
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var responseReceived = JSON.parse(helper.responseText)

                console.log(responseReceived)
                setFlat(responseReceived)
                console.log(Flat)
            }
        };

        helper.open("GET", "http://localhost:7078/admin/flatlist/" + id);
        helper.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type","application/json");
        helper.send()
    }
    var userRole = sessionStorage.getItem('Role');


    return (
        <>
            <Navbar userRole={userRole} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav userRole={userRole} />
                <Box sx={{ display: 'flex', marginTop: "100px", marginLeft: { sm: "176px" } }}>

                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ padding: "20px" }}
                        >
                            Flat List
                        </Typography>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            ID
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            Floor No
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            Flat No
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            Status
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            Flat Type
                                        </TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        sessionStorage.getItem("Role") == "ADMIN" ?

                                            Flat.map((f) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} >

                                                        <TableCell align="left">
                                                            {f.flatId}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {f.floorNo}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {f.flatNo == null ? "-" : f.flatNo}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                        {f.fullEmptyStatus == true ? "full" : "empty"}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                        {f.flatType}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                        {f.fullEmptyStatus == true ? "---" : <Link to="/addowner">assign Owner </Link>}
                                                        </TableCell>

                                                    </TableRow>
                                                );
                                            })

                                            :

                                            Flat.map((f) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} >

                                                        <TableCell align="left">
                                                            {f.flatId}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {f.floorNo}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {f.flatNo == null ? "-" : f.flatNo}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                        {f.fullEmptyStatus == true ? "full" : "empty"}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                        {f.flatType}
                                                        </TableCell>
                                                        
                                                    </TableRow>
                                                );
                                            })
                                        
                                        
                                        }

                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Paper>
                </Box>
            </Box>
            <Footer />
        </>
    );
}