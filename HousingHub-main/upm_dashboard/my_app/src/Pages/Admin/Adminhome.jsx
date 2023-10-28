import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer';
import Sidenav from '../../Components/Sidenav';

export default function Adminhome() {
  const userRole = "ADMIN";

  return (
    <>
    <Navbar userRole={userRole}/>

      <Box sx={{ display: 'flex' }}>

                <Sidenav userRole={userRole} />


        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Card sx={{ minWidth: 275, minHeight: 60 + "vh", marginTop:"75px", marginLeft: {sm: "176px" } }}>
                <CardContent>

                  <Box sx={{minHeight:"50px"}}/>
                  <Typography sx={{ fontSize: 30}} color="text.primary" gutterBottom>
                    Welcome {sessionStorage.getItem("UserName")}
                  </Typography>
                  <Box sx={{minHeight:"50px"}}/>
                  <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                  As an Admin for the Urban Property Management System (UPM), you will be to manage and oversee the assignment of owners to buildings within the system. You will play a crucial role in ensuring accurate and up-to-date information about building ownership and the relationships between owners and properties. Your tasks will revolve around maintaining the integrity of data, facilitating effective communication, and streamlining building-owner associations.
                  </Typography>
                  <Box sx={{minHeight:"50px"}}/>
                </CardContent>

              </Card>
            </Grid>
            <Box height={30} />
          </Grid>
        </Box>
      </Box>
      <Footer/>
      
      
     
     
    </>
  )
}
