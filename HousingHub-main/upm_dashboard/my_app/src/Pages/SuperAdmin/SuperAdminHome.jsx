import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer';
import Sidenav from '../../Components/Sidenav';



export default function SuperAdmin() {

    const userRole = "SUPERADMIN";

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
                      Welcome Super Admin
                    </Typography>
                    <Box sx={{minHeight:"50px"}}/>
                    <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                    As SuperAdmin for the Urban Property Management System (UPM), your can streamline and optimize the management of buildings and flats, offering builders a comprehensive toolset to efficiently oversee property portfolios, assign administrators, and access crucial building and admin details. Here's a detailed description of the key features.
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