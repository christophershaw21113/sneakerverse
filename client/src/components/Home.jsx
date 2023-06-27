
import React, { useState } from 'react';
import ImageSlider from './ImageSlider'
const Home = () => {
  const slides = [
    { url: 'http://localhost:3000/braxton-apana-vBfXwv4CVfw-unsplash.jpg', title: 'Forest', alt: 'Foggy forest with tall trees' },
    { url: 'http://localhost:3000/lefteris-kallergis-MaFE4MYbQgc-unsplash.jpg', title: 'City', alt: 'Nightlife in big city' },
    { url: 'http://localhost:3000/mick-haupt-O8_sTTWaJ14-unsplash.jpg', title: 'Italy', alt: 'Italy on the hill' },
  ]
  const containerStyles = {
    width: '100%',
    height: '500px',
    margin: '0 auto',

  }

  return (
    <div style={{ marginTop: '85px' }} className="carousel">
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default Home;
