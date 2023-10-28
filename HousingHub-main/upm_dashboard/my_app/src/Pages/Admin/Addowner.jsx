import { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Box from '@mui/material/Box';
import Sidenav from '../../Components/Sidenav';
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../css/Common.css';
import { toast } from "react-toastify";



const theme = createTheme();

export default function Addowner() {

    var buildingId = sessionStorage.getItem("buildingId");
    // var [buildingId, setBuildingId] = useState("")
    // var [flatId, setFlatId] = useState("1")
    var flatId = sessionStorage.getItem("flatId");

    const [isValidPassed, setIsValidPassed] = useState(false)

    const navigate = useNavigate()

    const [buildingList, setBuildingList] = useState([])

    const [flatList, setFlatList] = useState([])

    const ReverseToOwner = () => {
        navigate("/ADMIN");

    }

    useEffect(() => {
        getBuildingList();
    }, [])

    var adminId = sessionStorage.getItem("UserId");



    const onOptionChange = (event) => {
        debugger;
        var id = event.target.value;
        sessionStorage.setItem("buildingId", id);
        console.log("building iD  : " + buildingId);
        getFlatList();
    }

    const onOptionChangeFlat = (event) => {
      debugger
        // setFlatId(event.target.value);
        sessionStorage.setItem("flatId", event.target.value);

        console.log("flat Id" + flatId);
    }

    const getBuildingList = () => {
        debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var responseReceived = JSON.parse(helper.responseText);
                // console.log(responseReceived);
                setBuildingList(responseReceived);
                console.log(buildingList);
            }
        };

        helper.open("GET", "http://localhost:7078/admin/buildinglist/" + adminId);
        helper.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type", "application/json");
        helper.send();
    }
    const getFlatList = () => {
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var responseReceived = JSON.parse(helper.responseText);
                console.log(responseReceived);
                setFlatList(responseReceived);
                console.log(flatList);
            }
        };

        helper.open("GET", "http://localhost:7078/admin/emptyflats/" + parseInt(buildingId));
        helper.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type", "application/json");
        helper.send();
    }
    const Validation = () => {
        let isValid = true;
        if (Owner.name.length == "") {
            toast.warn("Name Can Not Be Empty")
            isValid = false;
        }
        if (Owner.emailId.length == "") {
            toast.warn("Email Can Not Be Empty")
            isValid = false;
        }
        if (Owner.contact.length == "") {
            toast.warn("Contact Can Not Be Empty")
            isValid = false;
        }
        if (Owner.password.length == "") {
            toast.warn("Password Can Not Be Empty")
            isValid = false;
        }
        if (Owner.permanentAddress.length == "") {
            toast.warn("Address Can Not Be Empty")
            isValid = false;
        }
        if (buildingId == null) {
            toast.warn("Select Building")
            isValid = false;
        }
        if (flatId == null) {
            toast.warn("Select Flat")
            isValid = false;
        }
        if (isValid) {
            setIsValidPassed(isValid)
        }
    }
    const addOwner = () => {
        Validation();
        if (isValidPassed) {
            var helper = new XMLHttpRequest();
            helper.onreadystatechange = () => {
                if (helper.readyState == 4 && helper.status == 200) {
                    var responseReceived = JSON.parse(helper.responseText);
                    console.log("responseReceived : " + responseReceived);
                    toast.success(responseReceived.message)
                    ReverseToOwner();
                }
            }
            helper.open("PUT", "http://localhost:7078/admin/addFlatToOwner/" + parseInt(flatId));
            helper.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
            helper.setRequestHeader("Content-Type", "application/json");
            helper.send(JSON.stringify(Owner));
        }
    }

    const [Owner, setOwner] = useState(
        {
            "addedDate": "",
            "name": "",
            "emailId": "",
            "contact": "",
            "password": "",
            "permanentAddress": "",
            "imagePath": "",
            "role": "",
            "flatId": 0
        }
    );

    const onTextChange = (args) => {

        var copyofOwner = { ...Owner };
        copyofOwner[args.target.name] = args.target.value;
        copyofOwner.addedDate = new Date().getDate();
        console.log(new Date().getDate());
        copyofOwner.role = "OWNER";
        setOwner(copyofOwner);
        console.log(Owner);
    }

    const userRole = "ADMIN";

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
                                    Add Owner
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

                                    <div>
                                        <select onChange={onOptionChange} className='selectorbox'>
                                            <option>Select Building</option>
                                            {buildingList.map((item) => {
                                                return <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            })}
                                        </select>

                                    </div>

                                    
                                    <div >
                                        {flatList.length == 0
                                            ?
                                            <select className='selectorbox'>
                                                <option>No Flat Available</option>  </select>
                                            :
                                            <select onChange={onOptionChangeFlat} className='selectorbox'>
                                                <option>Select Flat</option>
                                                {flatList.map((item) => {
                                                    return <option key={item.id} value={item.id}>
                                                        {item.flatId}
                                                    </option>
                                                })}
                                            </select>
                                        }

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
                                        onClick={addOwner}
                                    >
                                        Add Owner
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
