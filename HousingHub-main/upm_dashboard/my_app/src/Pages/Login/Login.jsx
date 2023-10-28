import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Select.css'
import { toast } from 'react-toastify';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                Urban Property Management
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const defaultTheme = createTheme();

export default function Login() {
    

    const [Credentials, setCredentials] = useState({ emailId: "", password: "" });

    const option = ['SUPERADMIN', 'BUILDER', 'ADMIN', 'OWNER', 'TENANT'];

    var [Role, SetRole] = useState("");

    const onOptionChange = (event) => {
        debugger;
        SetRole(event.target.value);
    }

    const navigate = useNavigate();
    const onTextChange = (args) => {

        var copyofCredentials = { ...Credentials };
        copyofCredentials[args.target.name] = args.target.value;
        setCredentials(copyofCredentials);
        console.log(Credentials.emailId + "   " + Credentials.password);
    }

    const Validation = () => {

        if (Credentials.emailId.length == "") {
            toast.warn("Email Can Not Be Empty")
        }
        if (Credentials.password.length == "") {
            toast.warn("Password Can Not Be Empty")
        }
    }

    const SignIn = () => {
        // debugger;
        Validation();
        if (Role == "SUPERADMIN") {
            var helper = new XMLHttpRequest();
            helper.onreadystatechange = () => {
                debugger;
                if (helper.readyState == 4 && helper.status == 200) {
                    debugger
                    var responseReceived = JSON.parse(helper.responseText);
                    console.log(responseReceived.emailId + "  " + responseReceived.password);
                    debugger
                    if (responseReceived.emailId == Credentials.emailId && responseReceived.password == Credentials.password) {
                        SetRole("/SUPERADMIN");
                        sessionStorage.setItem("Role", "SUPERADMIN");
                        navigate("/SUPERADMIN");
                        toast.success("Login Successfull");
                    }
                    else {
                        toast.error("Invalid Credentials");
                    }

                }
            }
            console.log(Credentials.emailId + " " + Credentials.password)
            helper.open("POST", "http://localhost:7078/users/super_admin_login");
            helper.setRequestHeader("Content-Type", "application/json");
            helper.send(JSON.stringify(Credentials));
        }
        else {
            var helper = new XMLHttpRequest();
            helper.onreadystatechange = () => {
                debugger;
                if (helper.readyState == 4) {
                    debugger
                    var responseReceived = JSON.parse(helper.responseText);
                    // setUser(responseReceived);
                    console.log(responseReceived.emailId + "  " + responseReceived.password);
                    if (responseReceived.jwt != null) {
                        debugger
                        navigate("/" + responseReceived.user.role);
                        SetRole("/" + responseReceived.user.role);
                        sessionStorage.setItem("Role", responseReceived.user.role);
                        sessionStorage.setItem("UserName", responseReceived.user.name);
                        sessionStorage.setItem("UserId", responseReceived.user.id);
                        sessionStorage.setItem("token",responseReceived.jwt)
                        toast.success("Login Successfull");
                    }
                    else {
                        toast.error(responseReceived.message);
                    }

                }
            }
            console.log(Credentials.emailId + " " + Credentials.password)
            helper.open("POST", "http://localhost:7078/users/login");
            helper.setRequestHeader("Content-Type", "application/json");
            helper.send(JSON.stringify(Credentials));
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random/?building&1)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#1c1c1c' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <TextField
                            onChange={onTextChange}
                            value={Credentials.emailId}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="emailId"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onChange={onTextChange}
                            value={Credentials.password}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <select onChange={onOptionChange} className='selectorbox'>
                                            <option>Select Role</option>
                                            {option.map((option, index) => {
                                                return <option key={index}>
                                                    {option}
                                                </option>
                                            })}
                        </select>

                        <Button
                            onClick={SignIn}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2,
                                backgroundColor: "#1c1c1c",
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'white',
                                    color: "black",
                                }, }} 
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>

                        </Grid>
                        <Copyright sx={{ mt: 5 }} />

                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}