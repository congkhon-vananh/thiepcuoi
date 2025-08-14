import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import { PlayCircleOutline } from '@mui/icons-material';

const VideoSection = () => {
  const [showVideo, setShowVideo] = useState(false);


  // Vimeo video URL and embed URL with autoplay enabled
  const embedUrl = 'https://player.vimeo.com/video/1109709235?h=240145750d&autoplay=1&muted=0&title=1&byline=1&portrait=1';

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
                    <Typography
                      variant="h4"
                      sx={{
                        mb: 1,
                        fontWeight: 700,
                        textAlign: 'center',
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                      }}
                    >
                      Video Cưới
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 2,
                        fontWeight: 500,
                        textAlign: 'center',
                        fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' }
                      }}
                    >
                      Công Khôn 💕 Vân Anh
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        opacity: 0.9,
                        textAlign: 'center',
                        px: 2,
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        lineHeight: 1.4
                      }}
                    >
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
                    frameBorder="0"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    allowFullScreen
                    title="Video Cưới Công Khôn 💕 Vân Anh - Vimeo"
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
