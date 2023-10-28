import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Box from '@mui/material/Box';
import Sidenav from '../../Components/Sidenav';
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer';
import '../../css/Common.css';
import { toast } from "react-toastify";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const theme = createTheme();

export default function AddAdmin() {
    
    const navigate = useNavigate()

    const [isValidPassed, setIsValidPassed] = useState(false)

    const ReverseToBuilder = () => {
        navigate("/BUILDER");
    }

    const Validation = () => {
        debugger
        let isValid = true;
        if (Admin.name.length == "") {
            toast.warn("Name Can Not Be Empty")
            isValid = false;
        }
        if (Admin.emailId.length == "") {
            toast.warn("Email Can Not Be Empty")
            isValid = false;
        }
        if (Admin.contact.length == "") {
            toast.warn("Contact Can Not Be Empty")
            isValid = false;
        }
        if (Admin.password.length == "") {
            toast.warn("Password Can Not Be Empty")
            isValid = false;
        }
        if (Admin.permanentAddress.length == "") {
            toast.warn("Address Can Not Be Empty")
            isValid = false;
        }
        if (isValid) {
            setIsValidPassed(isValid);
        }

    }


    const addAdmin = () => {
        Validation();
        if (isValidPassed) {
            var helper = new XMLHttpRequest();
            helper.onreadystatechange = () => {
                if (helper.readyState == 4 && helper.status == 200) {
                     var responseReceived = JSON.parse(helper.responseText);
                    // console.log("responseReceived : " + responseReceived);
                    toast.success(responseReceived.message)
                    ReverseToBuilder();
                }
            }
            helper.open("POST", "http://localhost:7078/builder/addAdmin/" + sessionStorage.getItem("UserId"));
            helper.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
            helper.setRequestHeader("Content-Type", "application/json");
            helper.send(JSON.stringify(Admin));
        }
    }


    const [Admin, setAdmin] = useState(
        {
            "addedDate": "",
            "name": "",
            "emailId": "",
            "contact": "",
            "password": "",
            "permanentAddress": "",
            "imagePath": "",
            "role": "",
        }
    );

    const onTextChange = (args) => {

        var copyofAdmin = { ...Admin };
        copyofAdmin[args.target.name] = args.target.value;
        copyofAdmin.addedDate = new Date().getDate();
        console.log(new Date().getDate());
        copyofAdmin.role = "ADMIN";
        setAdmin(copyofAdmin);
        console.log(Admin);
    }

    const userRole = "BUILDER";

    return (
        <>
            <Navbar userRole={userRole}/>
            <Box sx={{ display: 'flex' }}>
                <Sidenav userRole={userRole} />
                <ToastContainer />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs" >
                            <CssBaseline />
                            <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px', marginBottom:'100px'}}>
                                <Avatar sx={{ margin: '20px', backgroundColor: '#1c1c1c' }}>
                                    <PersonAddIcon />
                                </Avatar>

                                <Typography component="h1" variant="h5">
                                    Add Admin
                                </Typography>
                                <form style={{ width: '100%', marginTop: theme.spacing(3) }}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        onChange={onTextChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Email Address"
                                        name="emailId"
                                        onChange={onTextChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Contact"
                                        name="contact"
                                        onChange={onTextChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        name="password"
                                        onChange={onTextChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Permanent Address"
                                        name="permanentAddress"
                                        onChange={onTextChange}
                                    />


                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            marginTop: theme.spacing(2),
                                            backgroundColor: "#1c1c1c",
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'white',
                                                color: "black",
                                            },
                                        }}
                                        onClick={addAdmin}
                                    >
                                        Add Admin
                                    </Button>
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