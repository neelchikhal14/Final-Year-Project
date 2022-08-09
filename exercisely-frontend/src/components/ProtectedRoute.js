import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { USER_LOGOUT } from '../constants/userConstants';

const ProtectedRoute = ({ role, component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <Route
      {...rest}
      render={(props) => {
        // console.log(props);
        // console.log('user info', userInfo);
        if (sessionStorage.getItem('expiresAt')) {
          const currentDateTime = new Date().getTime();
          const expireTime = Number(sessionStorage.getItem('expiresAt'));
          // console.log('Current', new Date(currentDateTime));
          // console.log('Expire', new Date(expireTime));
          if (
            currentDateTime < expireTime &&
            userInfo &&
            userInfo.role === role
          ) {
            return <Component {...props} />;
          } else {
            console.log('inner else');
            dispatch({
              type: USER_LOGOUT,
            });
            sessionStorage.removeItem('expiresAt');
            return <Redirect to={{ path: '/' }} />;
          }
        }
        return <Redirect to={{ path: '/' }} />;
      }}
    />
  );
};

export default ProtectedRoute;
