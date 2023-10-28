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

export default function RentPayment() {
    var { id } = useParams();
    const navigate = useNavigate();
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

    useEffect(() => { getUtility() }, [])

    const getUtility = () => {
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var responseReceived = JSON.parse(helper.responseText);
                // console.log("responseReceived : " + responseReceived);
                // ReverseToBuilder();
                // navigate("/")
                setUtility(responseReceived);
            }
        }
        helper.open("GET", "http://localhost:7078/tenant/getUtilityByUtilityId/" + id);
        helper.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type","application/json");
        helper.send();

    }

    const payRent = () => {
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            debugger
            if (helper.readyState == 4 && helper.status == 200) {
                var responseReceived = JSON.parse(helper.responseText);
                // console.log("responseReceived : " + responseReceived);
                // ReverseToBuilder();
                // navigate("/")
                setUtility(responseReceived);
                toast.success(responseReceived.message);
                navigate("/getUtilityListOfTenant")
            }
        }
        helper.open("PUT", "http://localhost:7078/tenant/rentPayment/" + id);
        helper.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type","application/json");
        helper.send();

    }


    var userRole = sessionStorage.getItem('Role');
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
                                        placeholder="Enter Gas Bill" name="gasBill" value={Utility.gasBill} readOnly 
                                    />
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type="number"
                                        placeholder="Enter Water Bill" name="waterBill" value={Utility.waterBill} readOnly />

                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type="number"
                                        placeholder="Enter Electricity Bill" name="electricityBill" value={Utility.electricityBill} readOnly />
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type="number"
                                        placeholder="Enter Rent Amount" name="rentAmount" value={Utility.rentAmount} readOnly />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        type="Date"
                                        label="Added Date" name="addedDate" value={Utility.addedDate} readOnly
                                    />
                                    
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type="number"
                                        label="Total"
                                        name="total" value={parseFloat(Utility.waterBill) + parseFloat(Utility.gasBill) + parseFloat(Utility.electricityBill) + parseFloat(Utility.rentAmount)} readOnly 
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
                                        onClick={payRent}
                                    >
                                        Pay
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
