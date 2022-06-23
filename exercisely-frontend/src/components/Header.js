import React from 'react';

import './Header.css';
const Header = () => {
  return (
    <nav>
      <div className='logo'>
        <a href='#'>
          <img src='/images/logo/Exercise.Ly.png' alt='Logo' />
        </a>
      </div>
      <div>
        <ul>
          <li>
            <a href='#'>Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
