import { useEffect, useState } from 'react';
import { TextField, Button, Typography, Container, Paper, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Navbar from './Navbar'
import Footer from './Footer';
import Sidenav from './Sidenav';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const theme = createTheme();


export default function UpdateProfile() {
    var userId = sessionStorage.getItem("UserId");
    const navigate = useNavigate();

    const [Admin, setAdmin] = useState(
        {
            "addedDate": "",
            "name": "",
            "emailId": "",
            "contact": "",
            "password":"",
            "permanentAddress": "",
            "imagePath": "",
            "role": "",
            "flatId": 0
        }
    );
    useEffect(() => { getAdmin() }, [])
    const getAdmin = () => {
        debugger;
        var helper = new XMLHttpRequest()
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var responseReceived = JSON.parse(helper.responseText)

                console.log(responseReceived)
                setAdmin(responseReceived)
                console.log(Admin)
            }
        };

        helper.open("GET", "http://localhost:7078/users/getuser/" + userId);
        helper.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type", "application/json");
        helper.send()
    }

    const UpdateProfile = () => {
        debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var responseReceived = JSON.parse(helper.responseText);
                console.log("responseReceived : " + responseReceived);
                navigate("/" + sessionStorage.getItem("Role"));
                toast.warn(responseReceived.message)
            }
        }
        helper.open("PUT", "http://localhost:7078/admin/updateprofile/" + parseInt(userId));
        helper.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type", "application/json");
        helper.send(JSON.stringify(Admin));
    }

    const onTextChange = (args) => {

        var copyofAdmin = { ...Admin };
        copyofAdmin[args.target.name] = args.target.value;

        console.log(new Date().getDate());
        // copyofAdmin.role = Admin.role;
        // copyofAdmin.addedDate = Admin.addedDate;

        setAdmin(copyofAdmin);
        console.log(Admin);
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
                                    Update Profile
                                </Typography>
                                <form style={{ width: '100%', marginTop: theme.spacing(3) }}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        value={Admin.name}
                                        onChange={onTextChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Email ID"
                                        name="emailId"
                                        value={Admin.emailId}
                                        onChange={onTextChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="contact" onChange={onTextChange} value={Admin.contact}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Permanent Address"
                                        name="permanentAddress" onChange={onTextChange} value={Admin.permanentAddress}
                                    />


                                    <TextField
                                    type='password'
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Password"
                                        name="password"
                                       //  value={''}
                                       placeholder='Enter Password'
                                        onChange={onTextChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Role"
                                        name="role" onChange={onTextChange} value={Admin.role}
                                    />
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            marginTop: theme.spacing(2),
                                            backgroundColor: "black",
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'white',
                                                color: "black",
                                            },
                                        }}
                                        onClick={UpdateProfile}
                                        value={"Update"}
                                    >
                                        Update
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