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


export default function AssignBuildingToAdmin() {
    const navigate = useNavigate();

    const [AdminList, setAdminList] = useState([]);

    // const adminId = sessionStorage.getItem("adminId");

    const ReverseToBuilder = () => {
        navigate("/BUILDER");

    }

    const { id } = useParams()

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

    const onOptionChange = (event) => {
        debugger;
        // setAdminId(event.target.value);
        sessionStorage.setItem("adminId", event.target.value)
    }

    const getBuilding = () => {
        debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            debugger;
            if (helper.readyState == 4 && helper.status == 200) {
                var responseReceived = JSON.parse(helper.responseText);
                // console.log(responseReceived);
                setBuilding(responseReceived);
                console.log(Building);
            }
        };

        helper.open("GET", "http://localhost:7078/builder/getBuilding/" + id);
        helper.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type","application/json");
        helper.send();
    }

    const assignBuildingToAdmin = () => {
        debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            if (helper.readyState == 4 && helper.status == 200) {
                //  var responseReceived = JSON.parse(helper.responseText);
                // console.log("responseReceived : " + responseReceived);
                toast.success("Admin Assigned To Building Successfully")
                ReverseToBuilder();
            }
        }
        helper.open("PUT", "http://localhost:7078/builder/assignBuilding/" + sessionStorage.getItem("adminId") + "/" + id);
        helper.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type","application/json");
        helper.send();

    }
    useEffect(() => { getAdminList(); getBuilding() }, []);

    const getAdminList = () => {
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            if (helper.readyState == 4 && helper.status == 200) {
                var responseReceived = JSON.parse(helper.responseText);
                setAdminList(responseReceived);
                console.log("responseReceived : " + responseReceived.emailId);
            }
        }
        helper.open("GET", "http://localhost:7078/builder/adminlist/" + sessionStorage.getItem("UserId"));
        helper.setRequestHeader("Authorization",`Bearer ${sessionStorage.getItem("token")}`);
        helper.setRequestHeader("Content-Type","application/json");
        helper.send();
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
                                    Assign Admin
                                </Typography>
                                <form style={{ width: '100%', marginTop: theme.spacing(3) }}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        value={Building.name} id="" name="name" readOnly
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        value={Building.floorCount} id="" name="emailId" readOnly
                                    />
                                    
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        value={Building.phone} id="" name="contact" readOnly
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        value={Building.madeYear} id="" name="madeyear" readOnly
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        value={Building.address} id="" name="address" readOnly />


                                    <div className="form-group">
                                        <select onChange={onOptionChange} className='selectorbox'>
                                            <option>Select Admin</option>
                                            {AdminList.map((item) => {
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
                                        onClick={assignBuildingToAdmin}
                                    >
                                        Assign Admin
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
