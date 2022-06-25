import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllExercises } from '../actions/patientActions';

import { setSelectedExercise } from '../actions/patientActions';
import './PatientDashboardScreen.css';

const PatientDashboardScreen = ({ history }) => {
  const [exerciseName, setExerciseName] = useState('');
  const dispatch = useDispatch();
  const patientAssignedExercises = useSelector(
    (state) => state.patientAssignedExercises
  );
  const { loading, error, assignedExercises } = patientAssignedExercises;

  const seeStatsHandler = () => {
    history.push('/patient/view-staticstics');
  };

  const sendMessageHandler = () => {
    history.push('/patient/send-message');
  };

  const startExerciseHandler = () => {
    const selectedExercise = assignedExercises.filter(
      (ex) => ex.name === exerciseName
    );

    dispatch(setSelectedExercise(selectedExercise));

    /**
     * ? CHECK ROUTING
     */
    if (selectedExercise[0].repsRequired) {
      history.push('/patient/start-exercise-type-one');
    } else {
      history.push('/patient/start-exercise-type-two');
    }
  };

  useEffect(() => {
    dispatch(getAllExercises());
  }, [dispatch]);

  return (
    <div>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading</h3>}
      <section className='banner-start-exercise banner'>
        <div className='banner-img'>
          <img
            src='./images/patient-dashboard-banner-1.jpg'
            alt='banner-1-img'
          />
        </div>
        <div className='banner-info'>
          <h2>Exercise Time ?</h2>
          {assignedExercises ? (
            <select
              defaultValue={'DEFAULT'}
              onChange={(e) => setExerciseName(e.target.value)}
            >
              <option value='DEFAULT' disabled hidden>
                Choose here
              </option>
              {assignedExercises.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          ) : (
            <h2>No Pending Exercises</h2>
          )}
          <button onClick={startExerciseHandler}>Start Exercise</button>
        </div>
      </section>
      <section className='banner banner-view-stats'>
        <div className='banner-info'>
          <h2>State Quest</h2>
          <h3>Check Your Accuracy</h3>
          <button onClick={seeStatsHandler}>See Statistics</button>
        </div>
        <div className='banner-img'>
          <img
            src='./images/patient-dashboard-banner-2.jpg'
            alt='banner-2-img'
          />
        </div>
      </section>
      <section className='banner banner-message-doctor'>
        <div className='banner-img'>
          <img
            src='./images/patient-dashboard-banner-3.svg'
            alt='banner-3-img'
          />
        </div>
        <div className='banner-info'>
          <h2>Want to have a Word with your Doctor ?</h2>
          <button onClick={sendMessageHandler}>Send Message</button>
        </div>
      </section>
    </div>
  );
};

export default PatientDashboardScreen;
