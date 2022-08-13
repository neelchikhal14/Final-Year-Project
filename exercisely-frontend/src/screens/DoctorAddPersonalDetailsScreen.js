import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { registerPersonalDetails } from '../actions/doctorActions';

import Loader from '../components/Loader';
import Error from '../components/Error';

import './css/DoctorAddPersonalDetailsScreen.css';
const DoctorAddPersonalDetailsScreen = ({ history }) => {
  const dispatch = useDispatch();
  const {
    loading: loadingDoctorRegisterPersonalDetails,
    error: errorDoctorRegisterPersonalDetails,
  } = useSelector((state) => state.doctorRegisterPersonalDetails);

  const [doctorDetails, setDoctorDetails] = useState({
    clinicAddress: '',
    homeAddress: '',
    dob: new Date(),
    homeTelephone: '',
    workTelephone: '',
    gender: 'man',
    qualification: '',
  });
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDoctorDetails({ ...doctorDetails, [name]: value });
  };
  const registerDoctorDetailsHandler = (e) => {
    const localDob = new Date(doctorDetails.dob);
    const qualificationArray = doctorDetails.qualification.split(';');
    const docDetails = {
      clinicAddress: doctorDetails.clinicAddress,
      homeAddress: doctorDetails.homeAddress,
      homeTelephone: doctorDetails.homeTelephone,
      workTelephone: doctorDetails.workTelephone,
      dob: localDob.toISOString(),
      gender: doctorDetails.gender,
      qualification: qualificationArray,
    };

    dispatch(registerPersonalDetails(docDetails));
    history.push('/doctor-dashboard');
    setDoctorDetails({
      clinicAddress: '',
      homeAddress: '',
      dob: new Date(),
      homeTelephone: '',
      workTelephone: '',
      gender: 'man',
      qualification: '',
    });
    e.preventDefault();
  };

  return (
    <div className='add-details-container'>
      <h1>Fill Your Details</h1>
      {loadingDoctorRegisterPersonalDetails && <Loader />}
      {errorDoctorRegisterPersonalDetails && (
        <Error>
          <h3>{errorDoctorRegisterPersonalDetails}</h3>
        </Error>
      )}
      <form onSubmit={registerDoctorDetailsHandler} className='details-form'>
        <label htmlFor='clinicAddress'>Clinic Address</label>
        <input
          type='text'
          name='clinicAddress'
          placeholder='Enter Clinic Address'
          value={doctorDetails.clinicAddress}
          onChange={handleOnChange}
          required
        />
        <label htmlFor='homeAddress'>Home Address</label>
        <input
          type='text'
          name='homeAddress'
          placeholder='Enter Home Address'
          value={doctorDetails.homeAddress}
          onChange={handleOnChange}
          required
        />

        <label htmlFor='dob'>Date of Birth</label>
        <input
          type='date'
          id='dob'
          name='dob'
          value={doctorDetails.dob}
          onChange={handleOnChange}
        />
        <label htmlFor='workTelephone'>Work Telephone</label>
        <input
          type='text'
          name='workTelephone'
          placeholder='Enter Work Telephone'
          value={doctorDetails.workTelephone}
          onChange={handleOnChange}
          required
        />
        <label htmlFor='homeTelephone'>Home Telephone</label>
        <input
          type='text'
          name='homeTelephone'
          placeholder='Enter Home Telephone'
          value={doctorDetails.homeTelephone}
          onChange={handleOnChange}
          required
        />
        <label htmlFor='gender'>Gender</label>
        <div className='gender' name='gender'>
          <div>
            <input
              type='radio'
              name='gender'
              value='man'
              checked={doctorDetails.gender === 'man'}
              onChange={handleOnChange}
            />
            <label htmlFor='gender'>Male</label>
          </div>

          <div>
            <input
              type='radio'
              name='gender'
              value='woman'
              checked={doctorDetails.gender === 'woman'}
              onChange={handleOnChange}
            />
            <label htmlFor='gender'>Female</label>
          </div>

          <div>
            <input
              type='radio'
              name='gender'
              value='transgender man'
              checked={doctorDetails.gender === 'transgender man'}
              onChange={handleOnChange}
            />
            <label htmlFor='gender'>Transgender Man</label>
          </div>

          <div>
            <input
              type='radio'
              name='gender'
              value='transgender woman'
              checked={doctorDetails.gender === 'transgender woman'}
              onChange={handleOnChange}
            />
            <label htmlFor='gender'>Transgender Female</label>
          </div>
        </div>
        <label htmlFor='qualification'>Qualifications</label>
        <textarea
          name='qualification'
          cols='50'
          rows='10'
          placeholder='Please enter semicolon sepearated qualification'
          value={doctorDetails.qualification}
          onChange={handleOnChange}
        />

        <button type='submit' className='register-details-button'>
          Register Details
        </button>
      </form>
    </div>
  );
};

export default DoctorAddPersonalDetailsScreen;
