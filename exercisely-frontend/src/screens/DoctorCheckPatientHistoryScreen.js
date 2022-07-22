import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPatientHistory } from '../actions/doctorActions';

import './css/DoctorCheckPatientHistoryScreen.css';
const DoctorCheckPatientHistoryScreen = () => {
  const dispatch = useDispatch();
  const { patientHistory, loading, error } = useSelector(
    (state) => state.doctorGetPatientHistory
  );
  const [patientData, setPatientData] = useState({
    firstname: '',
    lastname: '',
  });
  const dataChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPatientData({ ...patientData, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getPatientHistory(patientData.firstname, patientData.lastname));
  };
  return (
    <div className='patient-history container'>
      <div>
        <form onSubmit={submitHandler}>
          <label htmlFor='firstname'>Enter Firstname</label>
          <input
            type='text'
            name='firstname'
            value={patientData.firstname}
            onChange={dataChangeHandler}
          />
          <label htmlFor='lastname'>Enter Lastname</label>
          <input
            type='text'
            name='lastname'
            value={patientData.lastname}
            onChange={dataChangeHandler}
          />
          <button type='submit'>Get Patient History</button>
        </form>
        {patientHistory && (
          <div className='patient-details-container'>
            <div className='patient-avatar'></div>
            <div className='personal-details'>
              <h3>Personal Details</h3>
              <span>Firstname:{patientHistory.bioData.firstname}</span>
              <span>Lastname:{patientHistory.bioData.lastname}</span>
              <span>Email:{patientHistory.bioData.email}</span>
              <span>
                Address: {patientHistory.patientDetails.address.country},{' '}
                {patientHistory.patientDetails.address.city},
                {patientHistory.patientDetails.address.addressLine},
                {patientHistory.patientDetails.address.postalCode}
              </span>
              <span>Date of Birth: {patientHistory.patientDetails.dob}</span>
              <span>
                Cell Number: {patientHistory.patientDetails.homeTelephone}
              </span>
              <span>
                Home Number: {patientHistory.patientDetails.mobileTelephone}
              </span>

              <h5>Next of Kin</h5>
              <span>Name: {patientHistory.patientDetails.nextOfKin.name}</span>
              <span>
                Telephone: {patientHistory.patientDetails.nextOfKin.telephone}
              </span>
              <span>
                Relation: {patientHistory.patientDetails.nextOfKin.relationship}
              </span>
            </div>
            <div className='medical-details'>
              <h3>Medical Details</h3>
              <span>Age: {patientHistory.patientDetails.age}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCheckPatientHistoryScreen;
