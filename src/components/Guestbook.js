import React, { useState, useEffect, useCallback } from 'react';
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
  Message,
  CheckCircle,

} from '@mui/icons-material';
import { guestbookAPI } from '../lib/supabase';

const Guestbook = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    email: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [guestMessages, setGuestMessages] = useState([]);

  // Load messages from Supabase
  const loadGuestMessages = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Loading messages from Supabase...');

      const result = await guestbookAPI.getMessages();

      if (result.success) {
        // Transform Supabase data to match our component format
        const transformedMessages = result.messages.map(msg => ({
          id: msg.id,
          name: msg.name,
          content: msg.content,
          timestamp: new Date(msg.created_at).toLocaleDateString('vi-VN'),
          email: msg.email,
          phone: msg.phone
        }));

        setGuestMessages(transformedMessages);
        console.log(`Loaded ${transformedMessages.length} approved messages from Supabase`);
      } else {
        console.error('Failed to load messages:', result.error);
        // Fallback to empty array if Supabase fails
        setGuestMessages([]);
      }

    } catch (error) {
      console.error('Error loading messages from Supabase:', error);
      setGuestMessages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load messages from Google Sheets on component mount
  useEffect(() => {
    loadGuestMessages();
  }, [loadGuestMessages]);

  // Setup real-time subscription for new approved messages
  useEffect(() => {
    const subscription = guestbookAPI.subscribeToMessages((payload) => {
      console.log('Real-time update received:', payload);

      if (payload.eventType === 'INSERT' && payload.new.approved) {
        // Add new approved message to the list
        const newMessage = {
          id: payload.new.id,
          name: payload.new.name,
          content: payload.new.content,
          timestamp: new Date(payload.new.created_at).toLocaleDateString('vi-VN'),
          email: payload.new.email,
          phone: payload.new.phone
        };

        setGuestMessages(prev => [newMessage, ...prev]);
      } else if (payload.eventType === 'UPDATE' && payload.new.approved) {
        // Handle message approval updates
        loadGuestMessages(); // Reload all messages
      }
    });

    return () => {
      guestbookAPI.unsubscribe(subscription);
    };
  }, [loadGuestMessages]);

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
        console.log('Submitting message to Supabase:', { name: formData.name, content: formData.message });

        const messageData = {
          name: formData.name,
          content: formData.message,
          email: formData.email || null,
          phone: formData.phone || null
        };

        const result = await guestbookAPI.addMessage(messageData);

        if (result.success) {
          console.log('Message saved to Supabase successfully!', result.message);
          setSubmitted(true);
          setFormData({ name: '', message: '', email: '', phone: '' });

          // Show success message
          setTimeout(() => {
            setSubmitted(false);
          }, 5000);
        } else {
          console.error('Failed to save message:', result.error);
          // Could show error alert here
        }

      } catch (error) {
        console.error('Error submitting message:', error);
        // Show error message to user but still allow form submission
        setSubmitted(true);
        setFormData({ name: '', message: '', email: '', phone: '' });
        setTimeout(() => setSubmitted(false), 5000);
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
                    <Alert
                      severity="success"
                      sx={{
                        mb: 3,
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        color: 'success.main',
                        '& .MuiAlert-icon': {
                          color: 'success.main'
                        }
                      }}
                      icon={<CheckCircle />}
                    >
                      <Typography variant="body2" fontWeight={600}>
                        Cảm ơn bạn đã gửi lời chúc! ❤️
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8, mt: 0.5, display: 'block' }}>
                        Lời chúc của bạn đang chờ duyệt và sẽ hiển thị sau khi được phê duyệt.
                      </Typography>
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
                                px: 1
                              }}
                            >
                              "{guest.content || guest.message}"
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
