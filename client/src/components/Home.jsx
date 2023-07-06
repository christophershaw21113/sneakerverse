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
      url: 'http://18.117.87.36/taylor-smith-aDZ5YIuedQg-unsplash.jpg',
      title: 'Jordan 1',
      alt: 'Chicago Air Jordan 1s on Basketball Court'
    },
    {
      url: 'http://18.117.87.36/lefteris-kallergis-j1GiPlvSGWI-unsplash.jpg',
      title: 'Air Max 90',
      alt: 'Multicolored Air Max 90 on curb during the day'
    },
    {
      url: 'http://18.117.87.36/diego-jaramillo-bJlZg69x5lg-unsplash.jpg',
      title: 'Yeezy 350',
      alt: 'Person holding up Yeezy 350 Glow'
    },
    {
      url: 'http://18.117.87.36/raul-de-los-santos-6tpdFZtbj0E-unsplash.jpg',
      title: 'New Balance',
      alt: 'New Balance shoes in fall leaves'
    },
    {
      url: 'http://18.117.87.36/alexander-rotker-l8p1aWZqHvE-unsplash.jpg',
      title: 'Nike Air Max 90',
      alt: 'Royal blue nike floating'
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
        <div style={{ marginTop: isSmallScreen ? '10%' : '5%' }}>
          <h2 style={{ textAlign: 'center' }}>Recent Releases</h2>
        </div>
        <MDBContainer style={{ display: 'flex', justifyContent: 'center', width: '80%', flexWrap: 'wrap' }}>
          {shoes
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3)
            .map((shoe, index) => (
              <MDBCard key={index} style={styleCard.card}>
                <MDBRipple rippleColor="light" rippleTag="div" className="bg-image hover-overlay">
                  <MDBCardImage src={`http://localhost:8000/uploads/${shoe.image}`} width="100%" alt={shoe.name} />
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
      </div>
    </div>
  );
};

export default Home;
