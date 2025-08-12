import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Favorite, CalendarToday, LocationOn } from '@mui/icons-material';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
        display: 'flex',
        alignItems: 'center',
        pt: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'float 4s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'Dancing Script',
                  fontSize: { xs: '2rem', md: '3rem' },
                  color: 'white',
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                Chúng tôi sắp kết hôn!
              </Typography>
              
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    color: 'white',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    mb: 1,
                  }}
                >
                  Công Khôn
                </Typography>
                <Favorite sx={{ fontSize: '2rem', color: 'white', mx: 2 }} />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    color: 'white',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    mt: 1,
                  }}
                >
                  Vân Anh
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => scrollToSection('#video')}
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  Xem Video Cưới
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => scrollToSection('#events')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'white',
                    },
                  }}
                >
                  Xem Lịch Cưới
                </Button>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card
                    sx={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <CalendarToday sx={{ fontSize: '2rem', color: 'primary.main', mb: 1 }} />
                      <Typography variant="h6" gutterBottom>
                        Lễ Cưới Nhà Cô Dâu
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        16 tháng 8, 2025
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card
                    sx={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <LocationOn sx={{ fontSize: '2rem', color: 'secondary.main', mb: 1 }} />
                      <Typography variant="h6" gutterBottom>
                        Lễ Cưới Nhà Chú Rể
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        17 tháng 8, 2025
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </Box>
  );
};

export default HeroSection;
