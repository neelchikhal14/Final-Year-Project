import React from 'react';
import './Loader.css';
const Loader = () => {
  return (
    <div className='loader'>
      <div className='loader-container'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className='loader-text'>
        <h3>Loading .. Please Wait..</h3>
      </div>
    </div>
  );
};

export default Loader;
