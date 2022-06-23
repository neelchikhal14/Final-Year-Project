import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
const Header = () => {
  return (
    <nav>
      <div className='logo'>
        <Link to='/'>
          <img src='/images/logo/Exercise.Ly.png' alt='Logo' />
        </Link>
      </div>
      <div>
        <ul>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
