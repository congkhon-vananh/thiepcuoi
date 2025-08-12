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
        height={height}
        image={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        sx={{
          objectFit: 'cover',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          opacity: loaded ? 1 : 0,
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.1)',
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


  // Real wedding photos of Công Khôn & Vân Anh
  const photos = [
    {
      src: `${process.env.PUBLIC_URL}/images/TUN07747.jpg`,
      alt: 'Ảnh cưới Công Khôn & Vân Anh 1',
      title: 'Khoảnh khắc hạnh phúc'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/TUN07763.jpg`,
      alt: 'Ảnh cưới Công Khôn & Vân Anh 2',
      title: 'Tình yêu đích thực'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/TUN07770.jpg`,
      alt: 'Ảnh cưới Công Khôn & Vân Anh 3',
      title: 'Ngày đặc biệt'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/TUN07965.jpg`,
      alt: 'Ảnh cưới Công Khôn & Vân Anh 4',
      title: 'Yêu thương vĩnh cửu'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/TUN07994.jpg`,
      alt: 'Ảnh cưới Công Khôn & Vân Anh 5',
      title: 'Hạnh phúc bên nhau'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/TUN08196.jpg`,
      alt: 'Ảnh cưới Công Khôn & Vân Anh 6',
      title: 'Kỷ niệm đẹp'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/TUN08291.jpg`,
      alt: 'Ảnh cưới Công Khôn & Vân Anh 7',
      title: 'Tình yêu bất tận'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/TUN08381.jpg`,
      alt: 'Ảnh cưới Công Khôn & Vân Anh 8',
      title: 'Lễ cưới đẹp'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/TUN08390.jpg`,
      alt: 'Ảnh cưới Công Khôn & Vân Anh 9',
      title: 'Nụ cười hạnh phúc'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/TUN08419.jpg`,
      alt: 'Ảnh cưới Công Khôn & Vân Anh 10',
      title: 'Cặp đôi hoàn hảo'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/TUN08438.jpg`,
      alt: 'Ảnh cưới Công Khôn & Vân Anh 11',
      title: 'Khoảnh khắc thiêng liêng'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/TUN08498.jpg`,
      alt: 'Ảnh cưới Công Khôn & Vân Anh 12',
      title: 'Tình yêu vĩnh cửu'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/15x21 (1).jpg`,
      alt: 'Ảnh cưới Công Khôn & Vân Anh 13',
      title: 'Studio cưới đẹp'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/15x21 (2).jpg`,
      alt: 'Ảnh cưới Công Khôn & Vân Anh 14',
      title: 'Phong cách cổ điển'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/15x21 (3).jpg`,
      alt: 'Ảnh cưới Công Khôn & Vân Anh 15',
      title: 'Áo dài truyền thống'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/60x90.jpg`,
      alt: 'Ảnh cưới Công Khôn & Vân Anh 16',
      title: 'Poster cưới đẹp'
    }
  ];

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
                      height={300}
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
