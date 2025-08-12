import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,

  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { PlayCircleOutline } from '@mui/icons-material';

const VideoSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  const theme = useTheme();


  // Dailymotion video URL and embed URL with parameters to prevent autoplay and next video

  const embedUrl = 'https://www.dailymotion.com/embed/video/x9omxmo?autoplay=0&mute=0&sharing-enable=0&ui-start-screen-info=0&ui-logo=0&queue-autoplay-next=0&queue-enable=0';

  const handlePlayVideo = () => {
    setShowVideo(true);
  };

  return (
    <Box
      id="video"
      sx={{
        py: 8,
        backgroundColor: 'background.default',
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
            <PlayCircleOutline 
              sx={{ 
                fontSize: '3rem', 
                color: 'primary.main', 
                mb: 2 
              }} 
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 2,
                color: 'text.primary',
              }}
            >
              Video Cưới
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                maxWidth: 600,
                mx: 'auto',
                fontStyle: 'italic',
              }}
            >
              Những khoảnh khắc đẹp nhất của chúng tôi
            </Typography>
          </Box>

          <Card
            sx={{
              maxWidth: 800,
              mx: 'auto',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box
                sx={{
                  position: 'relative',
                  paddingBottom: '56.25%', // 16:9 aspect ratio
                  height: 0,
                  overflow: 'hidden',
                }}
              >
                {!showVideo ? (
                  // Thumbnail with Play Button
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                        transform: 'scale(1.02)',
                      },
                    }}
                    onClick={handlePlayVideo}
                  >
                    <PlayCircleOutline 
                      sx={{ 
                        fontSize: '5rem', 
                        mb: 2,
                        opacity: 0.9,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }} 
                    />
                    <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, textAlign: 'center' }}>
                      Video Cưới
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 500, textAlign: 'center' }}>
                      Công Khôn & Vân Anh
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, textAlign: 'center', px: 2 }}>
                      Những khoảnh khắc đẹp nhất của chúng tôi
                    </Typography>
                    <Box
                      sx={{
                        mt: 3,
                        px: 3,
                        py: 1.5,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      ▶ Phát Video
                    </Box>
                  </Box>
                ) : (
                  // Video Iframe (only loads when user clicks play)
                  <iframe
                    src={embedUrl}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                    allow="fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Video Cưới Công Khôn & Vân Anh"
                  />
                )}
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontStyle: 'italic',
                maxWidth: 500,
                mx: 'auto',
              }}
            >
              "Tình yêu không chỉ là nhìn vào mắt nhau, mà là cùng nhau nhìn về một hướng"
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default VideoSection;
