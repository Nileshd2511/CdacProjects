import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Logo/logo white line_.png';
import profilepic from '../Assets/luffy.png';

const settings = ['Profile', 'Logout'];

const AppBar = styled(MuiAppBar, {})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const LinkText = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  }, fontSize: '16px'
}));

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showAppName, setShowAppName] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    sessionStorage.removeItem("UserName");
    sessionStorage.removeItem("UserId");
    sessionStorage.removeItem("buildingId");
    sessionStorage.removeItem("flatId");
    sessionStorage.removeItem("Role");
    
  };

  const handleCloseUserMenuProfile = () => {
    setAnchorElUser(null);
  };

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

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Luffy" src={profilepic} />
              </IconButton>
            </Tooltip>


            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {sessionStorage.getItem("Role") === "SUPERADMIN" ? (
                [
                  <MenuItem key="logout" onClick={handleCloseUserMenu}>
                    <LinkText to="/">Logout</LinkText>
                  </MenuItem>
                ]
              ) : (
                [
                  <MenuItem key="profile" onClick={handleCloseUserMenuProfile}>
                    <LinkText to={`/viewprofileall`}>Profile</LinkText>
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleCloseUserMenu}>
                    <LinkText to="/">Logout</LinkText>
                  </MenuItem>
                ]
              )}
            </Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
