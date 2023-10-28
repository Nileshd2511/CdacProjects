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
import { Link } from "react-router-dom";

export default function Buildinglist() {
  const [Building, setBuilding] = useState([]);
  var adminId = sessionStorage.getItem("UserId");
  useEffect(() => { getBuildingList() }, [])

  const getBuildingList = () => {
      debugger;
      var helper = new XMLHttpRequest();
      helper.onreadystatechange = () => {
          debugger;
          if (helper.readyState == 4 && helper.status == 200) {
              var responseReceived = JSON.parse(helper.responseText);
              // console.log(responseReceived);
              setBuilding(responseReceived);
              console.log(Building);
          }
      };

      helper.open("GET", "http://localhost:7078/admin/buildinglist/" + adminId);
      helper.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem("token")}`);
      helper.setRequestHeader("Content-Type","application/json");
      helper.send();
  }
  const userRole = "ADMIN";


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
              Buildings List
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ minWidth: "150px" }}>
                      Name
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "150px" }}>
                      Address
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "150px" }}>
                      Contact
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "150px" }}>
                      Made year
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "150px" }}>
                      Floor Count
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "150px" }}>
                      Actions
                    </TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {Building

                    .map((b) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} >

                          <TableCell align="left">
                            {b.name}
                          </TableCell>
                          <TableCell align="left">
                            {b.address}
                          </TableCell>
                          <TableCell align="left">
                            {b.phone}
                          </TableCell>
                          <TableCell align="left">
                            {b.madeYear}
                          </TableCell>
                          <TableCell align="left">
                            {b.floorCount}
                          </TableCell>
                          <TableCell align="left">
                            <Link to={`/getflatlist/${b.id}`}>View Flats</Link>
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