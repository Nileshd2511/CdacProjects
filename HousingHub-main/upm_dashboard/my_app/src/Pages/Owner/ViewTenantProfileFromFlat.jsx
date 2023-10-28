import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField,  Typography, Container, Paper, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer';
import Sidenav from '../../Components/Sidenav';

const theme = createTheme();


export default function ViewTenantProfile()  {

    var {id} = useParams();
    var userId = sessionStorage.getItem("UserId");
    const navigate = useNavigate();
    const [Tenant, setTenant] = useState(
        {
            "addedDate": "",
            "name": "",
            "emailId": "",
            "contact": "",
            "password": "",
            "permanentAddress": "",
            "imagePath": "",
            "role": "",
            "status": "",
            "leaveDate": "",
            "deposite": ""
        }
    );
    useEffect(() => { getTenant() }, [])

    const getTenant = () => {
        debugger;
        var helper = new XMLHttpRequest()
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var responseReceived = JSON.parse(helper.responseText)

                console.log(responseReceived)
                setTenant(responseReceived)
                console.log(Tenant)
            }
        };

        helper.open("GET", "http://localhost:7078/owner/tenantsflat/" + id);
        helper.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type","application/json");
        helper.send()
    }

    const UpdateProfile = () => {
        navigate("/updateprofile");
    }


    const userRole = sessionStorage.getItem("Role");;
    return (
        <>
            <Navbar userRole={userRole} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav userRole={userRole} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>


                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs" >
                            <CssBaseline />
                            <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
                                <Avatar sx={{ margin: '20px', backgroundColor: 'black' }}>
                                    <PersonIcon />
                                </Avatar>

                                <Typography component="h1" variant="h5">
                                    View Profile
                                </Typography>
                                <form style={{ width: '100%', marginTop: theme.spacing(3) }}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                        value={Tenant.name} readOnly
                                       
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Email ID"
                                        name="emailId"
                                        value={Tenant.emailId} readOnly
                                       
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="contact"
                                        value={Tenant.contact} readOnly
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Permanent Address"
                                        name="permanentAddress" 
                                        value={Tenant.permanentAddress} readOnly
                                    />


                                    {/* <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        name="password" onChange={onTextChange} value={Admin.addedDate} disabled
                                    /> */}
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Role"
                                        name="role" 
                                        value={Tenant.role} readOnly
                                    />
                                   
                                </form>
                            </Paper>
                        </Container>
                    </ThemeProvider>
                </Box>
            </Box>
            <Footer />
        </>
    );
}