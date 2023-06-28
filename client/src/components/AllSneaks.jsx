import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBContainer, MDBRipple, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useMediaQuery } from 'react-responsive';

const AllSneaks = () => {
  const [allSneaks, setAllSneaks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/shoes/`)
      .then(res => {
        console.log(res.data);
        setAllSneaks(res.data);
      })
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  const isSmallScreen = useMediaQuery({ maxWidth: 890 });
  const pageContainer = {
    marginTop: isSmallScreen ? '30%' : '10%',
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
      <div style={{ marginTop: '5%' }}>
        <h2 style={{ textAlign: 'center', paddingTop: '50px' }}>All Sneaks</h2>
      </div>
      <MDBContainer style={{ display: 'flex', justifyContent: 'center', width: '80%', flexWrap: 'wrap' }}>
  {allSneaks
    .map((shoe, index) => (
      <MDBCard key={index} style={styleCard.card}>
        <MDBRipple rippleColor="light" rippleTag="div" className="bg-image hover-overlay">
          <MDBCardImage src="http://localhost:3000/virgil-abloh-louis-vuitton-nike-air-force-1-release-9.jpg" width="100%" alt={shoe.name} />
        </MDBRipple>
        <MDBCardBody style={styleCard.container}>
          <MDBCardTitle>
            <Link to={`/`}><h3>{shoe.name}</h3></Link>
            <p>{shoe.brand}</p>
            <p>
            {shoe.discountedPrice > 1 ? (
              <div style={{display: 'inline'}}>
            <p><strong style={{ textDecoration: 'line-through' }}>${shoe.price}</strong> <span style={{color: 'red'}}>${shoe.discountedPrice}</span></p>
            </div>
             ) : (
             <span>${shoe.price}</span>
           )}
          
          </p>
            {/* link to ._id when product page is ready */}
          </MDBCardTitle>
        </MDBCardBody>
      </MDBCard>
    ))}
</MDBContainer>
    </div>
    </div>
  );
};


export default AllSneaks