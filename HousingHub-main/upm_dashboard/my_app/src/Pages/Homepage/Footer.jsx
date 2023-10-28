import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const FooterContainer = styled('footer')({
  backgroundColor: '#000000',
  color: '#ffffff',
  padding: '0.5rem 0',
  position: 'static',
  bottom: 0,
  width: '100%',
});

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Your Company Name. All Rights Reserved.
        </Typography>
        <Typography variant="body2" align="center">
          <Link color="inherit" href="/privacy-policy">
            Privacy Policy
          </Link>{' '}
          |{' '}
          <Link color="inherit" href="/terms-of-service">
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
