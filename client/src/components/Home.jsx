
import React, {useState} from 'react';

const Home = () => {
    const [index, setIndex] = useState(0); 
  const length = 3;

  const handlePrevious = () => {
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? length - 1 : newIndex);
  };

  const handleNext = () => {
    const newIndex = index + 1;
    setIndex(newIndex >= length ? 0 : newIndex);
  };


  return (
    <div style={{marginTop: '10%'}} className="carousel">
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
      <p>{index}</p>
    </div>
  );
};




export default Home;
