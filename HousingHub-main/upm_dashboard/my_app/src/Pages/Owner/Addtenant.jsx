import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from "react";
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


export default function AddTenant() {

    const navigate = useNavigate();


    var [Flat, setFlat] = useState([]);

    const [isValidPassed, setIsValidPassed] = useState(false)

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
    const onOptionChange = (event) => {
        debugger;
        sessionStorage.setItem("flatId", event.target.value);

        console.log("Flat iD  : " + flatid);
    }
    var flatid = sessionStorage.getItem("flatId");
    const Validation = () => {
        let isValid = true;
        if (Tenant.name.length == "") {
            toast.warn("Name Can Not Be Empty")
            isValid = false;
        }
        if (Tenant.emailId.length == "") {
            toast.warn("Email Can Not Be Empty")
            isValid = false;
        }
        if (Tenant.contact.length == "") {
            toast.warn("Contact Can Not Be Empty")
            isValid = false;
        }
        if (Tenant.password.length == "") {
            toast.warn("Password Can Not Be Empty")
            isValid = false;
        }
        if (Tenant.permanentAddress.length == "") {
            toast.warn("Address Can Not Be Empty")
            isValid = false;
        }
        if (Tenant.deposite.length == "") {
            toast.warn("Deposite Can Not Be Empty")
            isValid = false;
        }
        if (flatid == null) {
            toast.warn("Select Flat")
            isValid = false;
        }
        if (isValid) {
            setIsValidPassed(isValid)
        }
    }

    const addTenant = () => {
        Validation();
        // debugger
        // if (isValidPassed) {
            debugger
            var helper = new XMLHttpRequest();
            helper.onreadystatechange = () => {
                debugger
                if (helper.readyState == 4 && helper.status == 200) {
                    var responseReceived = JSON.parse(helper.responseText);
                    toast.success("Tenant Added Successfully")
                    navigate("/OWNER")
                }
            }
            helper.open("POST", "http://localhost:7078/owner/assignFlatToTenant/" + sessionStorage.getItem("flatId")
            );
            helper.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
            helper.setRequestHeader("Content-Type", "application/json");
            helper.send(JSON.stringify(Tenant));
        // }
    }

    useEffect(() => { getFlatList() }, [])

    const getFlatList = () => {
        var helper = new XMLHttpRequest()
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var responseReceived = JSON.parse(helper.responseText)

                console.log(responseReceived)
                setFlat(responseReceived)
                console.log(Flat)
            }
        };

        helper.open("GET", "http://localhost:7078/owner/flatlist/" + sessionStorage.getItem("UserId"));
        helper.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type","application/json");
        helper.send()
    }

    const onTextChange = (args) => {

        var copyofTenant = { ...Tenant };
        copyofTenant[args.target.name] = args.target.value;
        copyofTenant.addedDate = new Date().getDate();
        console.log(new Date().getDate());
        copyofTenant.role = "TENANT";
        setTenant(copyofTenant);
        console.log(Tenant);
    }


    const userRole = "OWNER";

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
                                    Add Tenant
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
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Deposit"
                                        name="deposite"
                                        onChange={onTextChange}
                                    />

                                    <div className="form-group">
                                        <select onChange={onOptionChange} className='selectorbox'>
                                            <option>Select Flat</option>
                                            {Flat.map((item) => {
                                                return <option key={item.flatId} value={item.flatId}>
                                                    {item.flatNo}
                                                </option>
                                            })}
                                        </select>
                                    </div>
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
                                        onClick={addTenant}
                                    >
                                        Add Tenant
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