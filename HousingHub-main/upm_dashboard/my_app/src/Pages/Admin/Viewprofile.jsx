import { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer';
import Sidenav from '../../Components/Sidenav';

const theme = createTheme();

export default function Viewprofile() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', formData);
    };

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
                <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
                    <Avatar sx={{ margin: '20px', backgroundColor: 'black' }}>
                        <PersonIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Profile
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: theme.spacing(3) }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
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
                        >
                            Update
                        </Button>
                    </form>
                </Paper>
            </Container>
        </ThemeProvider>
        </Box>
    </Box>
    <Footer/>
    </>
    );
}
