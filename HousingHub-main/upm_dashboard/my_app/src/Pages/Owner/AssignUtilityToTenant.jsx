import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
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


export default function AssignUtilityToTenant() {
    const navigate = useNavigate();

    var flatid = sessionStorage.getItem("flatId");

    var [Flat, setFlat] = useState([]);

    var TenantId = sessionStorage.getItem("tenantId");

    const [isValidPassed, setIsValidPassed] = useState(false)

    useEffect(() => { getFlatList(); getTenantList() }, []);

    const [Utility, setUtility] = useState(
        {
            "gasBill": "",
            "waterBill": "",
            "electricityBill": "",
            "billStatus": "",
            "rentAmount": "",
            "addedDate": "",
            "rentPaidDate": ""
        }
    );

    const Validate = () => {
        let isValid = true;
        if (Utility.gasBill.length == "") {
            toast.warn("Gas Bill Can Not Be Empty")
            isValid = false;
        }
        if (Utility.waterBill.length == "") {
            toast.warn("Water Bill Can Not Be Empty")
            isValid = false;
        }
        if (Utility.electricityBill.length == "") {
            toast.warn("Electricity Bill Can Not Be Empty")
            isValid = false;
        }
        if (Utility.rentAmount.length == "") {
            toast.warn("Rent Amount Can Not Be Empty")
            isValid = false;
        }
        if (Utility.addedDate.length == "") {
            toast.warn("Date Can Not Be Empty")
            isValid = false;
        }
        if (isValid) {
            setIsValidPassed(isValid)
        }
    }

    const [Tenant, setTenant] = useState([]);

    const onOptionChange = (event) => {
        debugger;
        // setflatid(event.target.value);
        // // setflatid(a);
        sessionStorage.setItem("flatId", event.target.value)
        console.log("Flat iD  : " + flatid);
    }

    const addUtility = () => {
        Validate();
        if (isValidPassed) {
            var helper = new XMLHttpRequest();
            debugger
            helper.onreadystatechange = () => {
                debugger;
                if (helper.readyState == 4 && helper.status == 200) {
                    var responseReceived = JSON.parse(helper.responseText);
                    console.log("responseReceived : " + responseReceived);
                    // ReverseToBuilder();
                    toast.success(responseReceived.message)
                    navigate("/OWNER")
                }
            }
            helper.open("POST", "http://localhost:7078/owner/assignUtilityToTenant/" + flatid + "/" + TenantId);
            helper.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
            helper.setRequestHeader("Content-Type", "application/json");
            helper.send(JSON.stringify(Utility));
        }
    }


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
        }
        helper.open("GET", "http://localhost:7078/owner/flatlist/" + sessionStorage.getItem("UserId"));
        helper.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type", "application/json");
        helper.send();
    }

    const getTenantList = () => {
        var helper = new XMLHttpRequest()
        helper.onreadystatechange = () => {
            if (helper.readyState == 4 && helper.status == 200) {
                var responseReceived = JSON.parse(helper.responseText)
                console.log(responseReceived)
                setTenant(responseReceived)
                console.log(Tenant)
            }
        }
        helper.open("GET", "http://localhost:7078/owner/tenantlist/" + sessionStorage.getItem("UserId"));
        helper.setRequestHeader("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type", "application/json");
        helper.send()
    }

    const onTextChange = (args) => {

        var copyofUtility = { ...Utility };
        copyofUtility[args.target.name] = args.target.value;

        setUtility(copyofUtility);
        console.log(Utility);
    }

    const onOptionChangeTenant = (event) => {
        debugger;
        // setTenantId(event.target.value);
        sessionStorage.setItem("tenantId", event.target.value)
        console.log(TenantId)
        debugger;
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
                                    Assign Utility To Flat
                                </Typography>
                                <form style={{ width: '100%', marginTop: theme.spacing(3) }}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type="number"
                                        placeholder="Enter Gas Bill" name="gasBill" onChange={onTextChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type="number"
                                        placeholder="Enter Water Bill" name="waterBill" onChange={onTextChange} />

                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type="number"
                                        placeholder="Enter Electricity Bill" name="electricityBill" onChange={onTextChange} />
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type="number"
                                        placeholder="Enter Rent Amount" name="rentAmount" onChange={onTextChange} />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        type="Date"
                                        label="Added Date" name="addedDate" onChange={onTextChange}
                                    />
                                    
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type="number"
                                        label="Total"
                                        name="total" value={parseFloat(Utility.waterBill) + parseFloat(Utility.gasBill) + parseFloat(Utility.electricityBill) + parseFloat(Utility.rentAmount)} disabled
                                    />
                                    <div className="form-group">
                                        <select onChange={onOptionChange} className='selectorbox'>
                                            <option key={0} value={0}>Select Flat</option>
                                            {Flat.map((item) => {
                                                return <option key={item.flatId} value={item.flatId}>
                                                    {item.flatNo}
                                                </option>
                                            })}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <select onChange={onOptionChangeTenant} className='selectorbox'>
                                            <option>Select Tenant</option>
                                            {Tenant.map((item) => {
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
                                        onClick={addUtility}
                                    >
                                        Assign Utility
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
