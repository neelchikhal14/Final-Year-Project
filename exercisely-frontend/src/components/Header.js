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
  const redirectDashboardHandler = () => {
    if (userInfo && userInfo.role === 'patient') {
      history.push('/patient-dashboard');
    } else if (userInfo && userInfo.role === 'doctor') {
      history.push('/doctor-dashboard');
    }
  };
  return (
    <nav>
      <div className='logo'>
        <Link to='/'>
          <img src='./images/logo/Exercise.Ly.png' alt='Logo' />
        </Link>
      </div>
      <div className='button-container'>
        <div className='buttons'>
          {!userInfo ? (
            <>
              <button name='login' onClick={clickHandler} className='login'>
                Login
              </button>
            </>
          ) : (
            <>
              <button name='logout' onClick={clickHandler} className='logout'>
                Logout
              </button>
              <button
                className='dashboard-redirect'
                onClick={redirectDashboardHandler}
              >
                Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
