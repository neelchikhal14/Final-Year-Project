import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { register } from '../actions/userActions';

import './RegistrationScreen.css';
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
  const { loading, userRegDetails, error } = userRegister;
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
        registrationDetails.firstname,
        registrationDetails.lastname,
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

    if (userRegDetails.success) {
      history.push('/login');
    }
    e.preventDefault();
  };

  return (
    <div>
      {loading && <h3>Loading</h3>}
      {error && <h3>{error}</h3>}
      <h3>Create New Account</h3>
      <form onSubmit={submitHandler}>
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
          <label htmlFor='role'>Doctor</label>
          <input
            type='radio'
            name='role'
            value='doctor'
            checked={registrationDetails.role === 'doctor'}
            onChange={handleOnChange}
          />
          <label htmlFor='role'>Patient</label>
          <input
            type='radio'
            name='role'
            value='patient'
            checked={registrationDetails.role === 'patient'}
            onChange={handleOnChange}
          />
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default RegistrationScreen;
