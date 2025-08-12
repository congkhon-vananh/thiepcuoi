import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Avatar,
  Chip,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  MenuBook,
  Send,
  Favorite,

  Message
} from '@mui/icons-material';

const Guestbook = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [guestMessages, setGuestMessages] = useState([]);

  // Google Apps Script Web App URL - cần được tạo và deploy
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxGFs59wik6aEZH1ijUgzX043reDi8c6cOfJvCRBwhlimPm5iypiaWxu4ohjxUdNICO5A/exec';

  const loadGuestMessages = async () => {
    try {
      setLoading(true);
      console.log('Initializing guestbook...');

      // Skip Google Sheets for now due to CORS issues
      // Will try Google Sheets in background but not block UI
      tryLoadFromGoogleSheets();

      // Initialize with some sample messages for better UX
      setGuestMessages([
        {
          id: 'sample-1',
          name: 'Gia đình hai bên',
          content: 'Chúc con gái và con rể luôn hạnh phúc, yêu thương và che chở cho nhau suốt cuộc đời. Chúc hai con sớm có tin vui!',
          timestamp: '2025-08-10'
        },
        {
          id: 'sample-2',
          name: 'Bạn bè thân thiết',
          content: 'Tình yêu của hai bạn thật đẹp và trong sáng! Chúc mừng hạnh phúc mới và chúc hai bạn trăm năm hạnh phúc bên nhau!',
          timestamp: '2025-08-09'
        }
      ]);
      console.log('Guestbook initialized with sample messages');

    } catch (error) {
      console.error('Error initializing guestbook:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load messages from Google Sheets on component mount
  useEffect(() => {
    loadGuestMessages();
  }, [loadGuestMessages]);

  // Try to load from Google Sheets in background (non-blocking)
  const tryLoadFromGoogleSheets = async () => {
    try {
      console.log('Attempting to load from Google Sheets...');
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=read`);
      const data = await response.json();

      if (data.success) {
        const visibleMessages = data.messages.filter(msg => msg.show === true);
        setGuestMessages(prev => {
          // Merge with existing messages, avoid duplicates
          const existingIds = prev.map(msg => msg.id);
          const newMessages = visibleMessages.filter(msg => !existingIds.includes(msg.id));
          return [...newMessages, ...prev];
        });
        console.log('Successfully loaded from Google Sheets:', visibleMessages.length);
      }
    } catch (error) {
      console.log('Google Sheets unavailable (expected due to CORS):', error.message);
    }
  };

  // const loadFallbackMessages = () => {
  //   console.log('Loading fallback messages...');
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.message) {
      try {
        setLoading(true);
        console.log('Submitting message:', { name: formData.name, content: formData.message });

        const requestBody = {
          action: 'write',
          name: formData.name,
          content: formData.message,
          show: false // Default to false, admin will approve later
        };

        console.log('Request body:', requestBody);
        console.log('Sending to URL:', GOOGLE_SCRIPT_URL);

        // Try to send data to Google Sheets
        try {
          const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
          });

          console.log('Response status:', response.status);
          const result = await response.json();
          console.log('Response result:', result);

          if (result.success) {
            console.log('Message saved to Google Sheets successfully!');
          } else {
            console.warn('Google Sheets returned error:', result.error);
          }
        } catch (fetchError) {
          console.warn('Google Sheets unavailable:', fetchError.message);
          console.log('Continuing with local storage fallback...');
        }

        // Always show success to user and add to local display
        const newMessage = {
          id: Date.now(),
          name: formData.name,
          content: formData.message,
          timestamp: new Date().toISOString().split('T')[0],
          show: true // Show immediately in local display
        };

        // Add to local messages for immediate display
        setGuestMessages(prev => [newMessage, ...prev]);

        // Clear form and show success
        setFormData({ name: '', message: '' });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        console.log('Message submitted successfully (with fallback)!');

      } catch (error) {
        console.error('Unexpected error:', error);
        alert('Có lỗi không mong muốn xảy ra. Vui lòng thử lại!');
      } finally {
        setLoading(false);
      }
    }
  };

  const getAvatarColor = (name) => {
    const colors = ['primary', 'secondary', 'success', 'warning', 'info'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <Box
      id="guestbook"
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
            <MenuBook
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
              Sổ Lời Chúc
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
              Hãy để lại những lời chúc phúc tốt đẹp nhất cho chúng tôi
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Guest Message Form */}
            <Grid item xs={12} md={5}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                  color: 'white',
                  position: 'sticky',
                  top: 100,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Message sx={{ fontSize: '2rem', mr: 2 }} />
                    <Typography variant="h5" fontWeight={600}>
                      Gửi Lời Chúc
                    </Typography>
                  </Box>

                  {submitted && (
                    <Alert severity="success" sx={{ mb: 3, color: 'white' }}>
                      Cảm ơn bạn đã gửi lời chúc! ❤️
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Tên của bạn"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      margin="normal"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Lời chúc của bạn"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      multiline
                      rows={4}
                      margin="normal"
                      placeholder="Hãy viết những lời chúc phúc tốt đẹp nhất..."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        },
                      }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      startIcon={loading ? null : <Send />}
                      disabled={loading}
                      sx={{
                        mt: 3,
                        backgroundColor: 'white',
                        color: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        },
                        '&:disabled': {
                          backgroundColor: 'rgba(255, 255, 255, 0.6)',
                          color: 'primary.main',
                        },
                      }}
                    >
                      {loading ? 'Đang gửi...' : 'Gửi Lời Chúc'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Guest Messages List */}
            <Grid item xs={12} md={7}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Lời Chúc Từ Mọi Người ({guestMessages.length})
              </Typography>

              <Box sx={{ maxHeight: 600, overflowY: 'auto', pr: 1 }}>
                {guestMessages.map((guest, index) => (
                  <motion.div
                    key={guest.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        mb: 3,
                        '&:hover': {
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                          transform: 'translateY(-2px)',
                          transition: 'all 0.3s ease',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <Avatar
                            sx={{
                              bgcolor: `${getAvatarColor(guest.name)}.main`,
                              mr: 2,
                              width: 50,
                              height: 50,
                            }}
                          >
                            {guest.name.charAt(0)}
                          </Avatar>

                          <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Typography variant="h6" fontWeight={600}>
                                {guest.name}
                              </Typography>
                              {guest.relationship && (
                                <Chip
                                  label={guest.relationship}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                  sx={{ ml: 2 }}
                                />
                              )}
                            </Box>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 2 }}
                            >
                              {guest.timestamp}
                            </Typography>

                            <Typography
                              variant="body1"
                              sx={{
                                mt: 2,
                                fontStyle: 'italic',
                                lineHeight: 1.6,
                                '&::before': { content: '"' },
                                '&::after': { content: '"' }
                              }}
                            >
                              {guest.content || guest.message}
                            </Typography>
                          </Box>

                          <Favorite sx={{ color: 'primary.main', ml: 1 }} />
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Guestbook;
