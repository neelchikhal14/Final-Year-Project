import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarChart from '../components/charts/BarChart';
import { getExercisesStats } from '../actions/patientActions';

import './css/PatientStatsScreen.css';
const PatientStatsScreen = ({ history }) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [stats, setStats] = useState(null);

  const dispatch = useDispatch();

  const { completeExerciseDetails, loading, error } = useSelector(
    (state) => state.patientGetExerciseStats
  );

  const submitHandler = (e) => {
    dispatch(getExercisesStats(fromDate, toDate));
    e.preventDefault();
  };

  const genStats = (instance) => {
    instance.sessionStats.forEach((sessionStat) => {
      for (const dValue in instance.desiredValue) {
        console.log(instance.desiredValue[dValue]);
        if (sessionStat.avgAngle * 0.5 < instance.desiredValue[dValue]) {
          console.log('if');
          return `<h2>Need to increase angle at ${dValue}</h2>`;
        } else {
          console.log('else');
          return `<h2>Need to decrease angle at ${dValue}</h2>`;
        }
      }
    });
  };

  return (
    <div className='patient-stat-screen-container'>
      {loading && <h2>Loading</h2>}
      {error && <h2>{error}</h2>}
      <h1>Stat Screen</h1>
      <section className='date-range-form'>
        <form onSubmit={submitHandler} className='date-form'>
          <label htmlFor='fromDate'>From Date:</label>
          <input
            type='date'
            id='fromDate'
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <label htmlFor='toDate'>To Date:</label>
          <input
            type='date'
            id='to'
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button type='submit' className='get-stats-button'>
            Get Statistics
          </button>
        </form>
      </section>
      {completeExerciseDetails && completeExerciseDetails.length > 0 && (
        <section className='graph-and-details-section'>
          {completeExerciseDetails.map((instance) => (
            <div className='exercise-container' key={instance._id}>
              <BarChart singleExerciseInfo={instance} />
              <div className='exercise-stats-info'>
                <h3>
                  Exercise Name: <span>{instance.exInfo.name}</span>
                </h3>
                {instance.reps > 0 && (
                  <h3>
                    Reps: <span>{instance.reps}</span>
                  </h3>
                )}
                <h3>
                  Exercise Session Assigned Completion Date:{' '}
                  <span>
                    {new Date(instance.assignedCompletion)
                      .toISOString()
                      .substring(0, 10)}
                  </span>
                </h3>
                <h3>
                  Exercise Session Actual Completion Date:{' '}
                  <span>
                    {new Date(instance.actualCompletionDate)
                      .toISOString()
                      .substring(0, 10)}
                  </span>
                </h3>
                <h3>Statistics:</h3>
                {/* {instance.sessionStats.forEach((sessionStat) => {
                  for (const dValue in instance.desiredValue) {
                    console.log(instance.desiredValue[dValue]);
                    if (
                      sessionStat.avgAngle * 0.5 <
                      instance.desiredValue[dValue]
                    ) {
                      console.log('if');
                      return `<h2>Need to increase angle at ${dValue}</h2>`;
                    } else {
                      console.log('else');
                      return `<h2>Need to decrease angle at ${dValue}</h2>`;
                    }
                  }
                })} */}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default PatientStatsScreen;
