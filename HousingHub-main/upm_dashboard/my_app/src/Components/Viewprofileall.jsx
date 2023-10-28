import { useEffect,useState } from 'react';
import { TextField, Button, Typography, Container, Paper, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Navbar from './Navbar'
import Footer from './Footer';
import Sidenav from './Sidenav';
import { useNavigate } from "react-router-dom";


const theme = createTheme();

export default function ViewProfileall() {
    var userId = sessionStorage.getItem("UserId");
    const userRole = sessionStorage.getItem("Role");;

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
    useEffect(() => { getAdmin() }, [userId,userRole])

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
        helper.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type","application/json");
        helper.send()
    }

    const UpdateProfile = () => {
        navigate("/updateprofile");
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
                                        value={Admin.name} disabled
                                        onChange={onTextChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Email ID"
                                        name="emailId"
                                        value={Admin.emailId} disabled
                                        onChange={onTextChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="contact" onChange={onTextChange} value={Admin.contact} disabled
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Permanent Address"
                                        name="permanentAddress" onChange={onTextChange} value={Admin.permanentAddress} disabled
                                    />


                                    {/* <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        name="password" onChange={onPasswordChange}  
                                        value={password}
                                    /> */}
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Role"
                                        name="role" onChange={onTextChange} value={Admin.role} disabled
                                    />
                                    <Button
                                        type="submit"
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
                                        Update Profile
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