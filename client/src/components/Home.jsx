import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBContainer, MDBRipple, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useMediaQuery } from 'react-responsive';


const Home = () => {
  const [shoes, setShoes] = useState([]);
  // const url = 'https://www.sneakerverse.net';
  const backendURL = "http://localhost:8000"
  useEffect(() => {
    axios
      .get(`${backendURL}/api/shoes/`)
      .then(res => {
        setShoes(res.data);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const containerStyles = {
    width: '100%',
    height: '500px',
    margin: '0 auto'
  };

  const isSmallScreen = useMediaQuery({ maxWidth: 890 })

  const is320 = useMediaQuery({ maxWidth: 321 })
  const is353 = useMediaQuery({ maxWidth: 354 })
  const is360 = useMediaQuery({ maxWidth: 361 })
  const is375 = useMediaQuery({ maxWidth: 376 })
  const is393 = useMediaQuery({ maxWidth: 394 })
  const is414 = useMediaQuery({ maxWidth: 415 })
  const is600 = useMediaQuery({ maxWidth: 601 })
  const is820 = useMediaQuery({ maxWidth: 821 })
  const is1024 = useMediaQuery({ maxWidth: 1025 })
  const is1440 = useMediaQuery({ maxWidth: 1441 })
  const is2560 = useMediaQuery({ maxWidth: 2561 })

  const pageContainer = {
    marginTop: '85px',
    height: is320 ? '240vh' : is353 ? '215vh' : is360 ? '255vh' : is375 ? '250vh' : is393 ? '215vh' : is414 ? '190vh' : is600 ? '185vh' : is820 ? '150vh' : is2560 ? "155vh" : '180vh'
  };

  const styleCard = {
    card: {
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      transition: '0.3s',
      width: '350px',
      marginBottom: '30px',
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
    // <div>
    <div style={pageContainer} className="carousel">
      <div style={containerStyles}>
        <ImageSlider />
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
                <MDBCardImage src={`${backendURL}/uploads/${shoe.image}`} width="100%" alt={shoe.name} />
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
    // </div>
  );
};

export default Home;
