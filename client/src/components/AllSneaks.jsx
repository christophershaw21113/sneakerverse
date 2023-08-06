import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBContainer, MDBRipple, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useMediaQuery } from 'react-responsive';

const AllSneaks = (props) => {
  const { brand, setBrand } = props
  const [allSneaks, setAllSneaks] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/shoes/`)
      .then(res => {
        // console.log(res.data);
        // setAllSneaks(res.data);
        setAllSneaks(res.data.filter((shoe) => shoe.brand.toLowerCase().includes(brand.toLowerCase())));
        // console.log(res.data.filter((shoe)=>shoe.brand.toLowerCase().includes("yeezy")));
        // console.log(sortedSneaks)
        setCurrentPage(1)

      })
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
    setCurrentPage(1)
  }

  const sortedSneaks = [...allSneaks].sort((a, b) => {
    if (sortOption === 'lowest') {
      return a.price - b.price
    } else if (sortOption === 'highest') {
      return b.price - a.price
    } else if (sortOption === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    } else if (sortOption === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt)
    } else if (sortOption === 'a') {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    } else if (sortOption === 'z') {
      return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    }
    return 0
  })

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value)
  }
  const handleSearch = (e) => {
    e.preventDefault()
    axios.get('http://localhost:8000/api/shoes', { params: { search: searchQuery } })
      .then((res) => {
        const searchedResults = res.data.filter((shoe) => shoe.brand.toLowerCase().includes(brand.toLowerCase()) && (shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) || shoe.color.toLowerCase().includes(searchQuery.toLowerCase())))
        setAllSneaks(searchedResults)
        setCurrentPage(1)
      })
      .catch((err) => console.log(err))
  }

  // Pagination
  const itemsPerPage = 9
  const totalPages = Math.ceil(sortedSneaks.length / itemsPerPage)
  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedSneaks.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const isSmallScreen = useMediaQuery({ maxWidth: 965 });
  const isMobileScreen = useMediaQuery({ maxWidth: 550 });
  const pageContainer = {
    marginTop: isSmallScreen ? '30%' : '10%',
    height: isSmallScreen ? '240vh' : '150vh',
    marginBottom: '100px'
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
        <div style={{ marginTop: '25px', paddingTop: isMobileScreen ? '75px' : '20px' }}>
          <h2 style={{ textAlign: 'center' }}>{brand === "nike" ? `Nike (${sortedSneaks.length})` : brand === "jordan" ? `Air Jordan (${sortedSneaks.length})` : brand === "yeezy" ? `Yeezy (${sortedSneaks.length})` : brand === "adidas" ? `Adidas (${sortedSneaks.length})` : brand === "new balance" ? `New Balance (${sortedSneaks.length})` : `All Sneakers (${sortedSneaks.length})`}</h2>
        </div>
        <div style={{ textAlign: "center" }}>
          <select className='select-all' value={sortOption} onChange={handleSortChange}>
            <option value="">-- Select Sorting Option --</option>
            <option value="lowest">Price: Lowest to Highest</option>
            <option value="highest">Price: Highest to Lowest</option>
            <option value="newest">Added: Newest to Oldest</option>
            <option value="oldest">Added: Oldest to Newest</option>
            <option value="a">A-Z</option>
            <option value="z">Z-A</option>
          </select>
          <form onSubmit={handleSearch}>
            <input className='search-sneaks' type="text" value={searchQuery} onChange={handleSearchInputChange} placeholder='Sneaker Searcher' />
            <button className='search-btn' onClick={handleSearch}>Search</button>
          </form>
        </div>
        <MDBContainer style={{ display: 'flex', justifyContent: 'center', width: '80%', flexWrap: 'wrap' }}>
          {currentItems
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
        <div className="custom-pagination" style={{ paddingBottom: "100px" }}>
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <li style={{ textAlign: "center" }} key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(number)}>
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


export default AllSneaks