import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { clearState } from '../utlities/utilities';
import { USER_LOGOUT } from '../constants/userConstants';
import './Header.css';
const Header = ({ setLogoutTriggered }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const clickHandler = (e) => {
    if (e.target.name === 'login') {
      history.push('/login');
    } else {
      dispatch({
        type: USER_LOGOUT,
      });
      clearState('all', dispatch);
      setLogoutTriggered(true);
      history.push('/');
    }
  };

  const redirectDashboardHandler = () => {
    if (userInfo && userInfo.role === 'patient') {
      history.push({
        pathname: '/patient-dashboard',
        state: { from: location.pathname },
      });
      // history.push('/patient-dashboard', [{ from: location.pathname }]);
    } else if (userInfo && userInfo.role === 'doctor') {
      history.push({
        pathname: '/doctor-dashboard',
        state: { from: location.pathname },
      });
      // history.push('/doctor-dashboard', [{ from: location.pathname }]);
    }
    // console.log('location', location.pathname);
    // console.log('header', history);
    if (history.location['state'] !== undefined) {
      console.log('i executed');
      clearState(history.location.state.from, dispatch);
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
