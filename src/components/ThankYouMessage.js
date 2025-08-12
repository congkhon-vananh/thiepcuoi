import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { FavoriteOutlined } from '@mui/icons-material';
import { FormatQuote } from '@mui/icons-material';

const ThankYouMessage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      id="thanks"
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
            <FavoriteOutlined 
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
              Lời Cảm Ơn
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
              Từ trái tim chúng tôi đến tất cả những người thân yêu
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={10} lg={8}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -30,
                    left: -30,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                  }}
                />
                
                <CardContent sx={{ p: 6, position: 'relative', zIndex: 1 }}>
                  <FormatQuote sx={{ fontSize: '3rem', opacity: 0.3, mb: 2 }} />
                  
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      lineHeight: 1.6,
                      fontStyle: 'italic',
                      textAlign: 'center',
                    }}
                  >
                    Chúng tôi cảm thấy vô cùng hạnh phúc và biết ơn khi có được sự yêu thương, 
                    ủng hộ và chúc phúc từ gia đình và bạn bè trong hành trình tình yêu của mình.
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      lineHeight: 1.8,
                      textAlign: 'center',
                      opacity: 0.95,
                    }}
                  >
                    Tình yêu của chúng tôi đã được nuôi dưỡng và lớn mạnh nhờ vào những lời khuyên, 
                    sự động viên và tình cảm chân thành từ những người thân yêu nhất. 
                    Mỗi lời chúc, mỗi nụ cười, mỗi cái ôm đều là những món quà vô giá 
                    mà chúng tôi sẽ trân trọng mãi mãi.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          fontSize: '2rem',
                          mx: 'auto',
                          mb: 1,
                        }}
                      >
                        CK
                      </Avatar>
                      <Typography variant="h6" sx={{ fontFamily: 'Dancing Script' }}>
                        Công Khôn
                      </Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          fontSize: '2rem',
                          mx: 'auto',
                          mb: 1,
                        }}
                      >
                        VA
                      </Avatar>
                      <Typography variant="h6" sx={{ fontFamily: 'Dancing Script' }}>
                        Vân Anh
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: 'center',
                      fontFamily: 'Dancing Script',
                      fontSize: '1.5rem',
                    }}
                  >
                    Cảm ơn bạn đã là một phần trong câu chuyện tình yêu của chúng tôi! ❤️
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ThankYouMessage;
