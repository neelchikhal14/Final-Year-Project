import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { USER_LOGOUT } from '../constants/userConstants';
import './Header.css';
const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const history = useHistory();
  const clickHandler = (e) => {
    if (e.target.name === 'login') {
      history.push('/login');
    } else {
      dispatch({
        type: USER_LOGOUT,
      });
      history.push('/');
    }
  };
  return (
    <nav>
      <div className='logo'>
        <Link to='/'>
          <img src='/images/logo/Exercise.Ly.png' alt='Logo' />
        </Link>
      </div>
      <div>
        {!userInfo ? (
          <button name='login' onClick={clickHandler} className='login'>
            Login
          </button>
        ) : (
          <button name='logout' onClick={clickHandler} className='logout'>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
