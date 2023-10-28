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

export default function AddFlat() {

  
    const [buildingList, setBuildingList] = useState([])

    var builderId = sessionStorage.getItem("UserId");

    var buildingId = sessionStorage.getItem("buildingId");

    const TypeList = ['1BHK', '2BHk', '3BHk'];

    const navigate = useNavigate();

    const [isValidPassed, setIsValidPassed] = useState(false)

    const [Flat, setFlat] = useState({
        "floorNo": "",
        "flatNo": "",
        "fullEmptyStatus": "",
        "fullEmptyStatusOfTenant": "",
        "flatType": ""
    })

    useEffect(() => { getBuildingList() }, [])

    const onTextChange = (event) => {
        var copyOfFlat = { ...Flat }
        copyOfFlat[event.target.name] = event.target.value;
        copyOfFlat.fullEmptyStatus = false;
        copyOfFlat.fullEmptyStatusOfTenant = false;
        setFlat(copyOfFlat);
        console.log(Flat);

    }

    const onOptionChange = (event) => {
        debugger;
        // setBuildingId(event.target.value);
        sessionStorage.setItem("buildingId", event.target.value)

    }
    const onOptionChangeFlat = (event) => {
        debugger;
        var copyOfFlat = { ...Flat }
        copyOfFlat.flatType = event.target.value;
        setFlat(copyOfFlat);

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

        helper.open("GET", "http://localhost:7078/builder/buildinglist/" + builderId);
        helper.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type", "application/json");
        helper.send();
    }
    const Validation = () => {
        let isValid = true;
        if (Flat.floorNo.length == "") {
            toast.warn("Floor No Can Not Be Empty")
            isValid = false;
        }
        if (Flat.flatNo.length == "") {
            toast.warn("Flat No Can Not Be Empty")
            isValid = false;
        }
        if (Flat.flatType.length == "") {
            toast.warn("Flat Type Can Not Be Empty")
            isValid = false;
        }
        if (isValid) {
            setIsValidPassed(isValid);
        }
    }
    const AddFlat = () => {
        Validation();
        if (isValidPassed) {
            var helper = new XMLHttpRequest();
            helper.onreadystatechange = () => {
                debugger;
                if (helper.readyState == 4 && helper.status == 200) {
                    var responseReceived = JSON.parse(helper.responseText);
                    // console.log(responseReceived);
                    setFlat(responseReceived);
                    console.log(Flat);
                    toast.success(responseReceived.message)
                    navigate("/BUILDER")
                }
            };
            helper.open("POST", "http://localhost:7078/builder/addFlat/" + buildingId);
            helper.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
            helper.setRequestHeader("Content-Type", "application/json");
            helper.send(JSON.stringify(Flat));
        }
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
                                    Add Flat
                                </Typography>
                                <form style={{ width: '100%', marginTop: theme.spacing(3) }}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Enter Floor Number"
                                        name="floorNo"
                                        onChange={onTextChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Enter Flat Number"
                                        name="flatNo"
                                        onChange={onTextChange}
                                    />

                                    <div>
                                        <select onChange={onOptionChangeFlat}  className='selectorbox'>
                                            <option>Select Flat Type</option>
                                            {TypeList.map((option, item) => {
                                                return <option key={item.id}>
                                                    {option}
                                                </option>
                                            })}
                                        </select>

                                    </div>


                                    <div className="form-group">
                                        <select onChange={onOptionChange} className='selectorbox'>
                                            <option>Select Building</option>
                                            {buildingList.map((item) => {
                                                return <option key={item.id} value={item.id}>
                                                    {item.name}
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
                                        onClick={AddFlat}
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
