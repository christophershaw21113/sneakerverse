import React, { useState } from "react";
import AR from '../Images/Slides/alexander-rotker-l8p1aWZqHvE-unsplash.jpg'
import DJ from '../Images/Slides/diego-jaramillo-bJlZg69x5lg-unsplash.jpg'
import LK from '../Images/Slides/lefteris-kallergis-j1GiPlvSGWI-unsplash.jpg'
import RDLS from '../Images/Slides/raul-de-los-santos-6tpdFZtbj0E-unsplash.jpg'
import TS from '../Images/Slides/taylor-smith-aDZ5YIuedQg-unsplash.jpg'

const ImageSlider = () => {

  const slides = [
    {
      url: `${TS}`,
      title: 'Jordan 1',
      alt: 'Chicago Air Jordan 1s on Basketball Court'
    },
    {
      url: `${LK}`,
      title: 'Air Max 90',
      alt: 'Multicolored Air Max 90 on curb during the day'
    },
    {
      url: `${DJ}`,
      title: 'Yeezy 350',
      alt: 'Person holding up Yeezy 350 Glow'
    },
    {
      url: `${RDLS}`,
      title: 'New Balance',
      alt: 'New Balance shoes in fall leaves'
    },
    {
      // url: `${url}/alexander-rotker-l8p1aWZqHvE-unsplash.jpg`,
      url: `${AR}`,
      title: 'Nike Air Max 90',
      alt: 'Royal blue nike floating'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  }

  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  }

  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",

  }

  const sliderStyles = {
    height: '100%',
    position: 'relative'

  }

  const slideStyles = {
    width: '100%',
    height: '100%',
    border: 'none',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${slides[currentIndex].url})`

  }

  const dotsContainerStyles = {
    display: 'flex',
    justifyContent: 'center'
  }

  const dotStyles = {
    cursor: 'pointer',
    fontSize: '15px',
    width: '8px',
    height: '8px',
    margin: '10px 10px',
    color: 'slategrey',
    backgroundColor: '#fff',
    borderRadius: '50%',
    transition: '0.3s',
  }

  const activeDotStyles = {
    ...dotStyles,
    color: "#d4aab5",
    // Add any additional styles for the active dot here
  };

  return (
    <div style={sliderStyles}>
      <div style={leftArrowStyles} onClick={goToPrevious}>&#9664;</div>
      <div style={rightArrowStyles} onClick={goToNext}>&#9654;</div>
      <div style={slideStyles}></div>
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div 
          style={slideIndex === currentIndex ? activeDotStyles : dotStyles}
          key={slideIndex} 
          onClick={() => goToSlide(slideIndex)}>&#9679;</div>
        ))
        }
      </div>
    </div>
  )
};

export default ImageSlider;