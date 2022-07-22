import React from 'react';

const DoctorDashboardScreen = ({ history }) => {
  const addExerciseHandler = () => {
    history.push('/doctor-add-exercise');
  };

  const readMessagesHandler = () => {
    history.push('/doctor-read-patient-messages');
  };

  const checkPatientHistoryHandler = () => {
    history.push('/doctor-check-patient-messages');
  };
  return (
    <div>
      <section className='banner-start-exercise banner'>
        <div className='banner-img'>
          <img
            src='./images/doctor-dashboard-banner-1.jpg'
            alt='banner-1-img'
          />
        </div>
        <div className='banner-info'>
          <h2>Add Exercise for a Patient</h2>
          <button onClick={addExerciseHandler}>Add Exercise</button>
        </div>
      </section>
      <section className='banner banner-view-stats'>
        <div className='banner-info'>
          <h2>Read Patient Messages</h2>
          <button onClick={readMessagesHandler}>Patient Messages</button>
        </div>
        <div className='banner-img'>
          <img
            src='./images/doctor-dashboard-banner-2.png'
            alt='banner-1-img'
          />
        </div>
      </section>
      <section className='banner-start-exercise banner'>
        <div className='banner-img'>
          <img
            src='./images/doctor-dashboard-banner-3.jpg'
            alt='banner-1-img'
          />
        </div>
        <div className='banner-info'>
          <h2>Check Patient History</h2>
          <button onClick={checkPatientHistoryHandler}>Patient History</button>
        </div>
      </section>
    </div>
  );
};

export default DoctorDashboardScreen;
