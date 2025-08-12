import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Event,
  LocationOn,
  AccessTime,
  Map,
  Home,
  Favorite
} from '@mui/icons-material';

const EventDetails = () => {

  const events = [
    {
      id: 1,
      title: 'Lễ Vu Quy & Tiệc tại nhà Cô Dâu',
      date: '16 tháng 8, 2025',
      time: '11:00 AM',
      location: 'Nhà hàng Tân Bảo Ngọc',
      address: 'Thôn Phú Thành, xã A Lưới 3, TP Huế',
      mapUrl: 'https://maps.app.goo.gl/uLjnG69TMfrmZXDf9',
      icon: <Home sx={{ fontSize: '2rem', color: 'primary.main' }} />,
      color: 'primary',
      description: 'Lễ vu quy lúc 9h30 tại nhà cô dâu, tiệc cưới lúc 11h tại nhà hàng Tân Bảo Ngọc'
    },
    {
      id: 2,
      title: 'Lễ Thành Hôn & Tiệc tại nhà Chú Rể',
      date: '17 tháng 8, 2025',
      time: '11:00 AM',
      location: 'Nhà Chú Rể Công Khôn',
      address: 'Thôn 2, xã Phú Vinh, TP Huế',
      mapUrl: "https://www.google.com/maps/place/16%C2%B026'24.9%22N+107%C2%B047'17.3%22E/@16.4402389,107.7855741,17z/data=!3m1!4b1!4m4!3m3!8m2!3d16.4402389!4d107.788149?entry=ttu&g_ep=EgoyMDI1MDgxMC4wIKXMDSoASAFQAw%3D%3D",
      icon: <Favorite sx={{ fontSize: '2rem', color: 'secondary.main' }} />,
      color: 'secondary',
      description: 'Lễ thành hôn lúc 10h và tiệc cưới lúc 11h tại nhà chú rể'
    }
  ];

  const openMap = (mapUrl) => {
    window.open(mapUrl, '_blank');
  };

  return (
    <Box
      id="events"
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Event
              sx={{
                fontSize: '3rem',
                color: 'white',
                mb: 2
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 2,
                color: 'white',
              }}
            >
              Lịch Cưới
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: 600,
                mx: 'auto',
                fontStyle: 'italic',
              }}
            >
              Chúng tôi rất vui được chia sẻ những khoảnh khắc đặc biệt này cùng với bạn
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {events.map((event, index) => (
              <Grid item xs={12} md={6} key={event.id}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        transition: 'transform 0.3s ease',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        {event.icon}
                        <Typography
                          variant="h5"
                          sx={{
                            ml: 2,
                            fontWeight: 600,
                            color: 'text.primary',
                          }}
                        >
                          {event.title}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Event sx={{ color: 'text.secondary', mr: 1 }} />
                          <Typography variant="body1" color="text.primary">
                            {event.date}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <AccessTime sx={{ color: 'text.secondary', mr: 1 }} />
                          <Typography variant="body1" color="text.primary">
                            {event.time}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <LocationOn sx={{ color: 'text.secondary', mr: 1 }} />
                          <Box>
                            <Typography variant="body1" color="text.primary" fontWeight={500}>
                              {event.location}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {event.address}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 3, fontStyle: 'italic' }}
                      >
                        {event.description}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                        <Chip
                          label="Lễ cưới"
                          color={event.color}
                          size="small"
                        />
                        <Chip
                          label="Gia đình & Bạn bè"
                          variant="outlined"
                          size="small"
                        />
                      </Box>

                      <Button
                        variant="contained"
                        color={event.color}
                        fullWidth
                        startIcon={<Map />}
                        onClick={() => openMap(event.mapUrl)}
                        sx={{
                          py: 1.5,
                          fontWeight: 600,
                        }}
                      >
                        Xem Bản Đồ
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontStyle: 'italic',
                maxWidth: 500,
                mx: 'auto',
              }}
            >
              "Sự hiện diện của bạn là món quà tuyệt vời nhất mà chúng tôi có thể nhận được"
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default EventDetails;
