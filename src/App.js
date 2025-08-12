import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import VideoSection from './components/VideoSection';
import PhotoGallery from './components/PhotoGallery';
import EventDetails from './components/EventDetails';
import ThankYouMessage from './components/ThankYouMessage';
import GiftBox from './components/GiftBox';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Box sx={{ minHeight: '100vh' }}>
        <Header />
        <HeroSection />
        <VideoSection />
        <PhotoGallery />
        <EventDetails />
        <ThankYouMessage />
        <GiftBox />
        <Guestbook />
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
