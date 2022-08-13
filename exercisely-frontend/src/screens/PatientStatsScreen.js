import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getExercisesStats } from '../actions/patientActions';

import BarChart from '../components/charts/BarChart';
import Loader from '../components/Loader';
import Error from '../components/Error';

import { generateStatisticsOptimized } from '../utlities/utilities.js';

import './css/PatientStatsScreen.css';
const PatientStatsScreen = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [stats, setStats] = useState(null);

  const dispatch = useDispatch();

  const {
    completeExerciseDetails,
    loading: loaderPatientGetExerciseStat,
    error: errorPatientGetExerciseStat,
  } = useSelector((state) => state.patientGetExerciseStats);

  const submitHandler = (e) => {
    dispatch(getExercisesStats(fromDate, toDate));
    e.preventDefault();
  };

  useEffect(() => {
    if (completeExerciseDetails) {
      const statsArray = generateStatisticsOptimized(completeExerciseDetails);
      setStats([...statsArray]);
    }
  }, [completeExerciseDetails]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='patient-stat-screen-container'>
      {loaderPatientGetExerciseStat && <Loader />}
      {errorPatientGetExerciseStat && (
        <Error>
          <h3>{errorPatientGetExerciseStat}</h3>
        </Error>
      )}
      <h1>Statistics Screen</h1>
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
          {completeExerciseDetails.map((instance, idx) => (
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
                <h3>Feedback:</h3>
                {stats && stats[idx] !== undefined && (
                  <ul>
                    {stats[idx].map((singleExStat, index) => {
                      return <li key={index}>{singleExStat}</li>;
                    })}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default PatientStatsScreen;
