import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  CardGiftcard,

  QrCode,
  ContentCopy,
  CheckCircle
} from '@mui/icons-material';

const GiftBox = () => {
  const [open, setOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [copied, setCopied] = useState(false);

  const giftMethods = [
    {
      id: 'groom',
      title: 'Mừng Cưới Chú Rể',
      subtitle: 'Công Khôn',
      icon: <QrCode sx={{ fontSize: '2rem' }} />,
      color: 'primary',
      details: {
        name: 'Nguyễn Công Khôn',
        description: 'Quét mã QR để gửi tiền mừng cưới cho chú rể',
        qrImage: '/images/qr-groom.jpg',
        bankName: 'MB Bank',
        accountNumber: '0377006965'
      }
    },
    {
      id: 'bride',
      title: 'Mừng Cưới Cô Dâu',
      subtitle: 'Vân Anh',
      icon: <QrCode sx={{ fontSize: '2rem' }} />,
      color: 'secondary',
      details: {
        name: 'Lê Thị Vân Anh',
        description: 'Quét mã QR để gửi tiền mừng cưới cho cô dâu',
        qrImage: '/images/qr-bride.jpg',
        bankName: 'LP Bank',
        accountNumber: '0389886766'
      }
    }
  ];

  const handleOpenDialog = (method) => {
    setSelectedMethod(method);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMethod('');
    setCopied(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQRCode = () => {
    if (selectedGiftMethod?.details.qrImage) {
      const link = document.createElement('a');
      link.href = `${process.env.PUBLIC_URL}${selectedGiftMethod.details.qrImage}`;
      link.download = `QR-${selectedGiftMethod.details.name.replace(/\s+/g, '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const selectedGiftMethod = giftMethods.find(method => method.id === selectedMethod);

  return (
    <Box
      id="gift"
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
            <CardGiftcard
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
              Hộp Mừng Cưới
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
              Tình cảm của bạn là món quà quý giá nhất với chúng tôi
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {giftMethods.map((method, index) => (
              <Grid item xs={12} sm={6} md={4} key={method.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        transition: 'transform 0.3s ease',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                      },
                    }}
                    onClick={() => handleOpenDialog(method.id)}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 4 }}>
                      <Box
                        sx={{
                          color: `${method.color}.main`,
                          mb: 2,
                        }}
                      >
                        {method.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'text.primary',
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        {method.title}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          color: `${method.color}.main`,
                          fontFamily: 'Dancing Script',
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        {method.subtitle}
                      </Typography>
                      <Button
                        variant="contained"
                        color={method.color}
                        fullWidth
                        sx={{ mt: 2 }}
                      >
                        Xem Chi Tiết
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Gift Details Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <Box sx={{ color: `${selectedGiftMethod?.color}.main`, mb: 1 }}>
            {selectedGiftMethod?.icon}
          </Box>
          <Typography variant="h6">
            {selectedGiftMethod?.title}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            {/* QR Code Display */}
            <Box
              sx={{
                width: 250,
                height: 250,
                backgroundColor: 'white',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                border: '2px solid',
                borderColor: `${selectedGiftMethod?.color}.main`,
                overflow: 'hidden',
              }}
            >
              {selectedGiftMethod?.details.qrImage ? (
                <Box
                  component="img"
                  src={`${process.env.PUBLIC_URL}${selectedGiftMethod.details.qrImage}`}
                  alt={`Mã QR ${selectedGiftMethod.details.name}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Mã QR {selectedGiftMethod?.details.name}
                </Typography>
              )}
            </Box>

            {/* Description */}
            <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
              {selectedGiftMethod?.details.description}
            </Typography>

            {/* Download QR Button */}
            <Button
              variant="outlined"
              onClick={downloadQRCode}
              sx={{ mb: 3 }}
              startIcon={<ContentCopy />}
            >
              Tải mã QR về máy
            </Button>

            {/* Payment Information */}
            <Box sx={{ textAlign: 'left', maxWidth: 400, mx: 'auto' }}>
              <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                Thông Tin Chuyển Khoản
              </Typography>

              <Box sx={{ mb: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Tên tài khoản:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body1" fontWeight={500}>
                    {selectedGiftMethod?.details.name}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => copyToClipboard(selectedGiftMethod?.details.name)}
                  >
                    <ContentCopy fontSize="small" />
                  </Button>
                </Box>
              </Box>

              <Box sx={{ mb: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Tên ngân hàng:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body1" fontWeight={500}>
                    {selectedGiftMethod?.details.bankName}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => copyToClipboard(selectedGiftMethod?.details.bankName)}
                  >
                    <ContentCopy fontSize="small" />
                  </Button>
                </Box>
              </Box>

              <Box sx={{ mb: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Số tài khoản:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body1" fontWeight={500}>
                    {selectedGiftMethod?.details.accountNumber}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => copyToClipboard(selectedGiftMethod?.details.accountNumber)}
                  >
                    <ContentCopy fontSize="small" />
                  </Button>
                </Box>
              </Box>

              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  💡 Quét mã QR hoặc sao chép thông tin để chuyển khoản
                </Typography>
              </Alert>
            </Box>
          </Box>

          {copied && (
            <Alert severity="success" sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircle sx={{ mr: 1 }} />
                Đã sao chép vào clipboard!
              </Box>
            </Alert>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GiftBox;
