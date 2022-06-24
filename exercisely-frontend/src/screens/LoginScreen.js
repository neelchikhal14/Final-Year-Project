import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';

import './LoginScreen.css';
const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const submitHandler = (e) => {
    dispatch(login(email, password));
    setEmail('');
    setPassword('');

    e.preventDefault();
  };
  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === 'patient') {
        history.push(`/patient-dashboard`);
      } else if (userInfo.role === 'doctor') {
        history.push(`/doctor-dashboard`);
      } else {
        history.push(`/admin-dashboard`);
      }
    }
  }, [history, userInfo]);

  return (
    <div>
      <h1>Hello Again !</h1>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading</h3>}
      <form onSubmit={submitHandler}>
        <label>Email</label>
        <input
          type='text'
          placeholder='Please Enter Username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type='password'
          placeholder='Please Enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Login</button>
      </form>
      <h3>New Customer ?</h3>
      <Link to='/registration' className='registration-page-link'>
        Register
      </Link>
    </div>
  );
};

export default LoginScreen;
