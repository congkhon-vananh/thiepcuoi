import React, { useState, useCallback, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  IconButton,
  Skeleton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { PhotoLibrary, Close, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// Lazy Image Component with loading state
const LazyImage = ({ src, alt, height = 300, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef();

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
    setLoaded(true);
  }, []);

  return (
    <Box sx={{ position: 'relative', height, overflow: 'hidden' }}>
      {!loaded && !error && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={height}
          animation="wave"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      )}
      <CardMedia
        ref={imgRef}
        component="img"
        image={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        sx={{
          width: '100%',
          height: 'auto',
          maxHeight: '400px',
          objectFit: 'contain',
          backgroundColor: '#f5f5f5',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          opacity: loaded ? 1 : 0,
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
        loading="lazy" // Native lazy loading
      />
    </Box>
  );
};

const PhotoGallery = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [visibleImages, setVisibleImages] = useState(6); // Load 6 images initially


  // All wedding photos from public/images (excluding avatars)
  const imageFilenames = [
    'totinh.jpg', 'hoian.jpg', 'quochochue.jpg', 'oneyear.jpg',
    'damcuoianhtrai.jpg', 'quynhon.JPG','cauhon.jpg',
    '0 (2).jpg', '0 (4).jpg', '0 (5).jpg', '0 (6).jpg', '0 (7).jpg', '0 (8).jpg', '0 (9).jpg',
    '15x21 (1).jpg', '15x21 (2).jpg', '15x21 (3).jpg', '15x21 (4).jpg', '15x21 (5).jpg',
    '60x90.1.jpg', '60x90.jpg',
    'TUN07747.jpg', 'TUN07763.jpg', 'TUN07770.jpg', 'TUN07965.jpg', 'TUN07994.jpg',
    'TUN08196.jpg', 'TUN08291.jpg', 'TUN08381.jpg', 'TUN08390.jpg', 'TUN08419.jpg',
    'TUN08438.jpg', 'TUN08498.jpg', 'TUN08514.jpg', 'TUN08570.jpg'
    // Excluding: qr-bride.jpg, qr-groom.jpg (used in GiftBox), and avatar images
  ];

  // Generate photos array dynamically
  const photos = imageFilenames.map((filename, index) => {
    // Create meaningful titles based on filename patterns
    let title = 'Khoảnh khắc hạnh phúc';
    if (filename.startsWith('TUN')) {
      title = 'Ảnh cưới chuyên nghiệp';
    } else if (filename.startsWith('15x21')) {
      title = 'Ảnh studio đẹp';
    } else if (filename.includes('cauhon')) {
      title = 'She said yes!';
    } else if (filename.includes('damcuoi')) {
      title = 'Đám cưới anh trai';
    } else if (filename.includes('hoian')) {
      title = 'Kỉ niệm Hội An';
    } else if (filename.includes('oneyear')) {
      title = 'Kỉ niệm một năm bên nhau';
    } else if (filename.includes('hue')) {
      title = 'Trường chàng';
    } else if (filename.includes('totinh')) {
      title = 'Lời tỏ tình công khai';
    } else if (filename.includes('quynhon')) {
      title = 'Du hí Quy Nhơn';
    }

    return {
      src: `${process.env.PUBLIC_URL}/images/${filename}`,
      alt: `Ảnh cưới Công Khôn & Vân Anh ${index + 1}`,
      title: title
    };
  });

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const loadMoreImages = () => {
    setVisibleImages(prev => Math.min(prev + 6, photos.length));
  };

  return (
    <Box
      id="gallery"
      sx={{
        py: 8,
        backgroundColor: 'white',
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
            <PhotoLibrary
              sx={{
                fontSize: '3rem',
                color: 'secondary.main',
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
              Album Ảnh Cưới
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
              Những khoảnh khắc đáng nhớ nhất trong hành trình tình yêu của chúng tôi
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {photos.slice(0, visibleImages).map((photo, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card
                    sx={{
                      overflow: 'hidden',
                      '&:hover': {
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <LazyImage
                      src={photo.src}
                      alt={photo.alt}
                      onClick={() => handleImageClick(index)}
                    />
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Load More Button */}
          {visibleImages < photos.length && (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Box
                  component="button"
                  onClick={loadMoreImages}
                  sx={{
                    px: 4,
                    py: 2,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    border: 'none',
                    borderRadius: 2,
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  Xem Thêm Ảnh ({photos.length - visibleImages} ảnh còn lại)
                </Box>
              </motion.div>
            </Box>
          )}
        </motion.div>
      </Container>

      {/* Image Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.7)',
              },
            }}
          >
            <Close />
          </IconButton>

          <IconButton
            onClick={handlePrevious}
            sx={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.7)',
              },
            }}
          >
            <ArrowBackIos />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.7)',
              },
            }}
          >
            <ArrowForwardIos />
          </IconButton>

          <Box
            component="img"
            src={photos[selectedImage]?.src}
            alt={photos[selectedImage]?.alt}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '90vh',
              objectFit: 'contain',
            }}
          />

          <Typography
            variant="h6"
            sx={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.5)',
              px: 2,
              py: 1,
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            {photos[selectedImage]?.title}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PhotoGallery;
