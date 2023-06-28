import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBContainer, MDBRipple, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useMediaQuery } from 'react-responsive';


const Home = () => {
  const { id } = useParams();
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/shoes/`)
      .then(res => {
        setShoes(res.data);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slides = [
    {
      url: 'http://18.117.87.36/braxton-apana-vBfXwv4CVfw-unsplash.jpg',
      title: 'Forest',
      alt: 'Foggy forest with tall trees'
    },
    {
      url: 'http://18.117.87.36/lefteris-kallergis-MaFE4MYbQgc-unsplash.jpg',
      title: 'City',
      alt: 'Nightlife in big city'
    },
    {
      url: 'http://18.117.87.36/mick-haupt-O8_sTTWaJ14-unsplash.jpg',
      title: 'Italy',
      alt: 'Italy on the hill'
    },
    {
      url: 'http://18.117.87.36/leon-skibitzki-NMyuo1hoCAA-unsplash.jpg',
      title: 'Nikes splashing water',
      alt: 'Nikes splashing water'
    },
    {
      url: 'http://18.117.87.36/alexander-rotker-l8p1aWZqHvE-unsplash.jpg',
      title: 'Nikes splashing water',
      alt: 'Nikes splashing water'
    }
  ];

  const containerStyles = {
    width: '100%',
    height: '500px',
    margin: '0 auto'
  };

  const isSmallScreen = useMediaQuery({ maxWidth: 890 });
  const pageContainer = {
    marginTop: '85px',
    height: isSmallScreen ? '240vh' : '150vh',
  };

  const styleCard = {
    card: {
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      transition: '0.3s',
      width: '350px',
      marginBottom: '15px',
      marginTop: '30px',
      paddingBottom: '15px'

    },
    cardHover: {
      boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    },
    container: {
      padding: '2px 16px',
      width: '100%',
    }
  };

  return (
    <div>
      <div style={pageContainer} className="carousel">
        <div style={containerStyles}>
          <ImageSlider slides={slides} />
        </div>
        <div style={{ marginTop: '5%' }}>
          <h2 style={{ textAlign: 'center' }}>Recent Releases</h2>
        </div>
        <MDBContainer style={{ display: 'flex', justifyContent: 'center', width: '80%', flexWrap: 'wrap' }}>
          {shoes
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 4)
            .map((shoe, index) => (
              <MDBCard key={index} style={styleCard.card}>
                <MDBRipple rippleColor="light" rippleTag="div" className="bg-image hover-overlay">
                  <MDBCardImage src={`http://18.117.87.36/uploads/${shoe.image}`} width="100%" alt={shoe.name} />
                </MDBRipple>
                <MDBCardBody style={styleCard.container}>
                  <MDBCardTitle>
                    <Link to={`/shoes/${shoe._id}`}><h3>{shoe.name}</h3></Link>
                    <p>{shoe.brand}</p>
                      {shoe.discountedPrice > 1 ? (
                        <div style={{ display: 'inline' }}>
                          <p><strong style={{ textDecoration: 'line-through' }}>${shoe.price}</strong> <span style={{ color: 'red' }}>${shoe.discountedPrice}</span></p>
                        </div>
                      ) : (
                        <span>${shoe.price}</span>
                      )}
                  </MDBCardTitle>
                </MDBCardBody>
              </MDBCard>
            ))}
        </MDBContainer>
        <br/><br/><br/>
      </div>
    </div>
  );
};

export default Home;
