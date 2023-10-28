import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/Logo/logo white line_.png';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const settings = ['Profile', 'Logout'];

const AppBar = styled(MuiAppBar, {})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));


function Navbar() {
  const [showAppName, setShowAppName] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAppName(true);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#1c1c1b', color: '#2f2f2f' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ width: "430px" }} />
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: '40px',
              height: 'auto',
              marginRight: '10px'
            }}
          />
          <Box sx={{ width: "20px" }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#ffffff',
              textDecoration: 'none'
            }}
          >
            Urban Property Management
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

          <Stack spacing={2} direction="row" justifyContent="center">
            <Link to="/login">
              <Button variant="contained" style={{
                backgroundColor: "white",
                color: 'black',
                '&:hover': {
                  backgroundColor: 'black',
                  color: "white",
                },
              }}>
                Login
              </Button>
            </Link>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
