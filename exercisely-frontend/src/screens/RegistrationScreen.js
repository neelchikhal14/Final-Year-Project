import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../components/Loader';
import Error from '../components/Error';

import { register } from '../actions/userActions';

import './css/RegistrationScreen.css';
import { useEffect } from 'react';
const RegistrationScreen = ({ history }) => {
  const [registrationDetails, setRegistrationDetails] = useState({
    title: 'Mr. ',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'patient',
  });
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  // const history = useHistory();
  const {
    loading: loadingUserRegister,
    userRegDetails,
    error: errorUserRegister,
  } = userRegister;
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegistrationDetails({ ...registrationDetails, [name]: value });
    // console.log(registrationDetails);
  };

  const submitHandler = (e) => {
    dispatch(
      register(
        registrationDetails.title,
        registrationDetails.firstname.toLowerCase(),
        registrationDetails.lastname.toLowerCase(),
        registrationDetails.email,
        registrationDetails.password,
        registrationDetails.role
      )
    );

    setRegistrationDetails({
      title: 'Mr. ',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      role: 'patient',
    });

    e.preventDefault();
  };
  useEffect(() => {
    if (userRegDetails && userRegDetails.success) {
      history.push('/login');
      dispatch({ type: 'USER_CLEAR_REGISTRATION_DETAILS' });
    }
  }, [dispatch, history, userRegDetails]);

  return (
    <div className='registration-form-container'>
      {loadingUserRegister && <Loader />}
      {errorUserRegister && (
        <Error>
          <h3>{errorUserRegister}</h3>
        </Error>
      )}
      <h1>Create New Account</h1>
      <form onSubmit={submitHandler} className='registration-form'>
        <label htmlFor='title'>Title</label>
        <select
          name='title'
          onChange={handleOnChange}
          value={registrationDetails.title}
          required
        >
          <option value='Mr. '>Mr</option>
          <option value='Miss '>Miss</option>
          <option value='Mrs. '>Mrs</option>
          <option value='Mx '>Mx</option>
        </select>
        <label htmlFor='firstname'>Firstname</label>
        <input
          type='text'
          name='firstname'
          placeholder='Enter First Name'
          value={registrationDetails.firstname}
          onChange={handleOnChange}
          required
        />
        <label htmlFor='lastname'>Lastname</label>
        <input
          type='text'
          name='lastname'
          placeholder='Enter Last Name'
          value={registrationDetails.lastname}
          onChange={handleOnChange}
          required
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          placeholder='Enter Email'
          value={registrationDetails.email}
          onChange={handleOnChange}
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Enter Password'
          value={registrationDetails.password}
          onChange={handleOnChange}
          required
        />

        <div>
          <input
            type='radio'
            name='role'
            value='doctor'
            checked={registrationDetails.role === 'doctor'}
            onChange={handleOnChange}
          />
          <label htmlFor='role'>Doctor</label>
          <input
            type='radio'
            name='role'
            value='patient'
            checked={registrationDetails.role === 'patient'}
            onChange={handleOnChange}
          />
          <label htmlFor='role'>Patient</label>
        </div>
        <button type='submit' className='register-user-button'>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationScreen;
