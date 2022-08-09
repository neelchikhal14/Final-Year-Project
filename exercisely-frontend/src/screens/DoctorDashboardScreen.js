import React from 'react';

import './css/DoctorDashboardScreen.css';
const DoctorDashboardScreen = ({ history }) => {
  const addExerciseHandler = () => {
    history.push('/doctor-add-exercise');
  };

  const readMessagesHandler = () => {
    history.push('/doctor-read-patient-messages');
  };

  const checkPatientHistoryHandler = () => {
    history.push('/doctor-check-patient-history');
  };

  const addDoctorDetails = () => {
    history.push('/doctor-add-personal-details');
  };
  return (
    <div className='doctor-dashboard-container'>
      <section className='banner-add-exercise banner'>
        <div className='banner-img'>
          <img
            src='./images/doctor-dashboard-banner-1.jpg'
            alt='banner-1-img'
          />
        </div>
        <div className='banner-info'>
          <h2>Add Exercise for a Patient</h2>
          <button
            onClick={addExerciseHandler}
            className='doctor-functionality-button'
          >
            Add Exercise
          </button>
        </div>
      </section>
      <section className='banner banner-read-patient-messages'>
        <div className='banner-info'>
          <h2>Read Patient Messages</h2>
          <button
            onClick={readMessagesHandler}
            className='doctor-functionality-button'
          >
            Patient Messages
          </button>
        </div>
        <div className='banner-img'>
          <img
            src='./images/doctor-dashboard-banner-2.png'
            alt='banner-1-img'
          />
        </div>
      </section>
      <section className='banner-check-patient-history banner'>
        <div className='banner-img'>
          <img
            src='./images/doctor-dashboard-banner-3.jpg'
            alt='banner-1-img'
          />
        </div>
        <div className='banner-info'>
          <h2>Check Patient History</h2>
          <button
            onClick={checkPatientHistoryHandler}
            className='doctor-functionality-button'
          >
            Patient History
          </button>
        </div>
      </section>
      <section className='banner banner-add-details-banner'>
        <div className='banner-info'>
          <h2>Add My Details</h2>
          <button
            className='doctor-functionality-button'
            onClick={addDoctorDetails}
          >
            Add your Personal Details
          </button>
        </div>
        <div className='banner-img'>
          <img src='./images/patient-add-detailts.jpg' alt='banner-1-img' />
        </div>
      </section>
    </div>
  );
};

export default DoctorDashboardScreen;
