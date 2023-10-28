import * as React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
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



export default function GetUtilityListOfTenant() {
    var [Utility, setUtility] = useState([]);
    useEffect(() => { getUtilityList() }, [userRole])

    const getUtilityList = () => {
        var helper = new XMLHttpRequest()
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var responseReceived = JSON.parse(helper.responseText)

                console.log(responseReceived)
                setUtility(responseReceived)
                console.log(Utility)
            }
        };

        helper.open("GET", "http://localhost:7078/tenant/getUtilityListOfTenant/" + sessionStorage.getItem("UserId"));
        helper.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type", "application/json");
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
                            Utility Bill
                        </Typography>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            Gas Bill
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            Water Bill
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            Electricity Bill
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            Rent Amount
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            Total
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            Added Date
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            Paid Status
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            Paid Date
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Utility

                                        .map((utiltiy) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} >

                                                    <TableCell align="left">
                                                        {utiltiy.gasBill}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {utiltiy.waterBill}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {utiltiy.electricityBill}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {utiltiy.rentAmount}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {utiltiy.waterBill + utiltiy.gasBill + utiltiy.electricityBill + utiltiy.rentAmount}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {utiltiy.addedDate}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {utiltiy.billStatus == false ? <Link to={`/payRent/${utiltiy.id}`}>Pay Rent</Link> : "Paid"}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {utiltiy.rentPaidDate == null ? "---" : utiltiy.rentPaidDate}                                                    </TableCell>

                                                </TableRow>
                                            );
                                        })}

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