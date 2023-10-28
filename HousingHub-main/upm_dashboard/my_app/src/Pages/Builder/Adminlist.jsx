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

export default function Adminlist() {

    const [Admin, setAdmin] = useState([]);

    useEffect(() => { getAdminList() }, []);
    const getAdminList = () => {
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            if (helper.readyState == 4 && helper.status == 200) {
                var responseReceived = JSON.parse(helper.responseText);
                setAdmin(responseReceived);
                console.log("responseReceived : " + responseReceived.emailId);
                // if(Admin.length == 0){
                //     toast.warn("No Data Available")
                    
                // }
            }
        }
        helper.open("GET", "http://localhost:7078/builder/adminlist/" +sessionStorage.getItem("UserId"));
        helper.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type","application/json");
        helper.send();
    }
    const userRole = "BUILDER";

    return (
        <>
            <Navbar userRole={userRole}/>
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
                            Admin List
                        </Typography>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            Name
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            Email
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            Contact
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            Address
                                        </TableCell>
                                        <TableCell align="left" style={{ minWidth: "150px" }}>
                                            Role
                                        </TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Admin

                                        .map((admin) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} >

                                                    <TableCell align="left">
                                                        {admin.name}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {admin.emailId}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {admin.contact}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {admin.permanentAddress}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {admin.role}
                                                    </TableCell>

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