import React from 'react';

import { AiFillInstagram } from 'react-icons/ai';
import { AiFillFacebook } from 'react-icons/ai';
import { BsSnapchat } from 'react-icons/bs';
import './Footer.css';
const Footer = () => {
  return (
    <footer className='footer-container'>
      <div className='social-icons-container'>
        <span className='instagram'>
          <AiFillInstagram />
        </span>
        <span className='facebook'>
          <AiFillFacebook />
        </span>
        <span className='snapchat'>
          <BsSnapchat />
        </span>
      </div>
      <div className='copyrights'>
        <span className='brand'>Exercise.Ly</span>
        <span className='copyrights-symbol'>&copy; All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
