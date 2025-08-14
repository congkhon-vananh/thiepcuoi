import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Favorite,
  Facebook,
  Instagram,
  Email,
  Phone
} from '@mui/icons-material';

const Footer = () => {


  return (
    <Box
      sx={{
        backgroundColor: 'grey.900',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8} sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Dancing Script',
                mb: 2,
                color: 'primary.light',
              }}
            >
              Công Khôn 💕 Vân Anh
            </Typography>

            <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
              Cảm ơn bạn đã dành thời gian xem thiệp cưới của chúng tôi
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
              <IconButton
                sx={{
                  color: 'white',
                  '&:hover': {
                    color: 'primary.light',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{
                  color: 'white',
                  '&:hover': {
                    color: 'primary.light',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                sx={{
                  color: 'white',
                  '&:hover': {
                    color: 'primary.light',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Email />
              </IconButton>
              <IconButton
                sx={{
                  color: 'white',
                  '&:hover': {
                    color: 'primary.light',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Phone />
              </IconButton>
            </Box>

            <Divider sx={{ my: 3, borderColor: 'grey.700' }} />

            <Typography
              variant="body2"
              sx={{
                opacity: 0.7,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              Made with <Favorite sx={{ color: 'red', fontSize: '1rem' }} /> for our special day
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.5, mt: 1 }}>
              © 2025 Công Khôn & Vân Anh Wedding
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
