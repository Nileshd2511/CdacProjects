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

export default function AddBilding() {
    const navigate = useNavigate()

    const [isValidPassed, setIsValidPassed] = useState(false)

    const ReverseToBuilder = () => {
        navigate("/BUILDER");
    }


    const addBilding = () => {
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
            helper.open("POST", "http://localhost:7078/builder/addBuilding/" + sessionStorage.getItem("UserId"));
            helper.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
            helper.setRequestHeader("Content-Type", "application/json");
            helper.send(JSON.stringify(Building));
        }
    }

    const Validation = () => {
        let isValid = true;
        if (Building.name.length == "") {
            toast.warn("Name Can Not Be Empty")
            isValid = false;
        }
        if (Building.floorCount.length == "") {
            toast.warn("Floor Count Can Not Be Empty")
            isValid = false;
        }
        if (Building.phone.length == "") {
            toast.warn("Contact Can Not Be Empty")
            isValid = false;
        }
        if (Building.madeYear.length == "") {
            toast.warn("Made Year Can Not Be Empty")
            isValid = false;
        }
        if (Building.address.length == "") {
            toast.warn("Address Can Not Be Empty")
            isValid = false;
        }
        if (isValid) {
            setIsValidPassed(isValid);
        }

    }


    const [Building, setBuilding] = useState(
        {
            "addedDate": "",
            "name": "",
            "phone": "",
            "floorCount": "",
            "address": "",
            "madeYear": ""
        }
    );

    const onTextChange = (args) => {

        var copyofBuilding = { ...Building };
        copyofBuilding[args.target.name] = args.target.value;
        copyofBuilding.addedDate = new Date().getDate();
        console.log(new Date().getDate());
        setBuilding(copyofBuilding);
        console.log(Building);
    }

    const userRole = "BUILDER";
    return (
        <>
            <Navbar userRole={userRole} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav userRole={userRole} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs" >
                            <CssBaseline />
                            <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px', marginBottom: '100px' }}>
                                <Avatar sx={{ margin: '20px', backgroundColor: '#1c1c1c' }}>
                                    <PersonAddIcon />
                                </Avatar>

                                <Typography component="h1" variant="h5">
                                    Add Building
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
                                        label="Enter floor count"
                                        name="floorCount"
                                        onChange={onTextChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Enter Phone Number"
                                        name="phone"
                                        onChange={onTextChange}
                                    />
                                    <TextField
                                        type="Date"
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label=".        Made Year"
                                        name="madeYear"
                                        onChange={onTextChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Enter Address"
                                        name="address"
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
                                        onClick={addBilding}
                                    >
                                        Add Building
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