import React from 'react';
import { ImQuotesLeft } from 'react-icons/im';
import { ImQuotesRight } from 'react-icons/im';
import { Link } from 'react-router-dom';

import './HomeScreen.css';

const HomeScreen = () => {
  return (
    <section className='home-main-section'>
      <div className='home-title-tag'>
        <h1>
          <span id='title-start-quote'>
            <ImQuotesLeft />
          </span>
          Getting You Better Is Great, Keeping You That Way Is Better
          <span id='title-end-quote'>
            <ImQuotesRight />
          </span>
        </h1>
      </div>
      <div className='home-banner'>
        <div className='home-banner-img'>
          <img src='./images/homescreen.jpg' alt='homescreen-banner' />
        </div>
        <div className='home-banner-info' id='imp'>
          <h3>Join Us Now</h3>
          <h2>Begin your way to speedy recovery</h2>
          <Link to='/registration' className='home-banner-info-button'>
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeScreen;
