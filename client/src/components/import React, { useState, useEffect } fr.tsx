import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBRipple, MDBRow } from 'mdb-react-ui-kit';

const Home = () => {
  const { id } = useParams();
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/shoes/`)
      .then(res => {
        console.log(res.data);
        setShoes(res.data);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slides = [
    {
      url: 'http://localhost:3000/braxton-apana-vBfXwv4CVfw-unsplash.jpg',
      title: 'Forest',
      alt: 'Foggy forest with tall trees'
    },
    {
      url: 'http://localhost:3000/lefteris-kallergis-MaFE4MYbQgc-unsplash.jpg',
      title: 'City',
      alt: 'Nightlife in big city'
    },
    {
      url: 'http://localhost:3000/mick-haupt-O8_sTTWaJ14-unsplash.jpg',
      title: 'Italy',
      alt: 'Italy on the hill'
    }
  ];

  const containerStyles = {
    width: '100%',
    height: '500px',
    margin: '0 auto'
  };

  const pageContainer = {
    marginTop: '85px',
    height: '100vh'
  };

  return (
    <div style={pageContainer} className="carousel">
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
      <div style={{ marginTop: '5%' }}>
        <h2 style={{ textAlign: 'center' }}>Recent Releases</h2>
      </div>
      <div className="row">
      {shoes
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5)
      .map((shoe, index) => (
          <div className="col-sm-12 col-md-6 col-lg-6" key={index}>
            <MDBCard>
              <MDBRipple rippleColor="light" rippleTag="div" className="bg-image hover-overlay">
                <MDBCardImage src="http://localhost:3000/lefteris-kallergis-MaFE4MYbQgc-unsplash.jpg" width="250px" alt={shoe.name} />
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle>
                  <b>{shoe.name}</b>
                </MDBCardTitle>
              </MDBCardBody>
            </MDBCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
