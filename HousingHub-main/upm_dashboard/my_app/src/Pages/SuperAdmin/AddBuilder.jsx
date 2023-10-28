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


const theme = createTheme();

export default function AddBuilder() {

    const navigate = useNavigate()

    const [isValidPassed, setIsValidPassed] = useState(false)

    const ReverseToSuperAdmin = () => {
        navigate("/SUPERADMIN");

    }

    const addBuilder = () => {
        Validation();
        if (isValidPassed) {
            var helper = new XMLHttpRequest();
            
            helper.onreadystatechange = () => {
               
                if (helper.readyState == 4 && helper.status == 200) {
                 
                    var responseReceived = JSON.parse(helper.responseText);
                    console.log("responseReceived : " + responseReceived);
                    toast.success(responseReceived.message  )
                    ReverseToSuperAdmin();
                }
            }
            helper.open("POST", "http://localhost:7078/superadmin/addBuilder");
            helper.setRequestHeader("Content-Type", "application/json");
            helper.send(JSON.stringify(Builder));
        }
    }

    const Validation = () => {
        let isValid = true;
        if (Builder.name.length == "") {
            toast.warn("Name Can Not Be Empty")
            isValid = false;
        }
        if (Builder.emailId.length == "") {
            toast.warn("Email Can Not Be Empty")
            isValid = false;
        }
        if (Builder.contact.length == "") {
            toast.warn("Contact Can Not Be Empty")
            isValid = false;
        }
        if (Builder.password.length == "") {
            toast.warn("Password Can Not Be Empty")
            isValid = false;
        }
        if (Builder.permanentAddress.length == "") {
            toast.warn("Address Can Not Be Empty")
            isValid = false;
        }
        if (isValid) {
            setIsValidPassed(isValid)
        }
    }


    const [Builder, setBuilder] = useState(
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

        var copyofBuilder = { ...Builder };
        copyofBuilder[args.target.name] = args.target.value;
        console.log(new Date().getDate());
        copyofBuilder.role = "BUILDER";
        setBuilder(copyofBuilder);
        console.log(Builder);
    }


    const userRole = "SUPERADMIN";

    return (
        <>
            <Navbar userRole={userRole}/>
            <Box sx={{ display: 'flex' }}>
                <Sidenav userRole={userRole} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs" >
                            <CssBaseline />
                            <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px', marginBottom:'100px'}}>
                                <Avatar sx={{ margin: '20px', backgroundColor: '#1c1c1c' }}>
                                    <PersonAddIcon />
                                </Avatar>

                                <Typography component="h1" variant="h5">
                                    Add Builder
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
                                        onClick={addBuilder}
                                    >
                                        Add Builder
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