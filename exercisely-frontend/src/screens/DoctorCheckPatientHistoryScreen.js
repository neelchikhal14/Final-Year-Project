import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getPatientHistory,
  getPatientExerciseStat,
  doctorGetPateientExerciseStats,
  getMultiplePatients,
} from '../actions/doctorActions';

import BarChart from '../components/charts/BarChart';
import Loader from '../components/Loader';
import Error from '../components/Error';

import { generateStatisticsOptimized } from '../utlities/utilities';
import './css/DoctorCheckPatientHistoryScreen.css';
const DoctorCheckPatientHistoryScreen = () => {
  const dispatch = useDispatch();
  const {
    patientHistory,
    loading: loadingDoctorGetPatientHistory,
    error: errorDoctorGetPatientHistory,
  } = useSelector((state) => state.doctorGetPatientHistory);

  const {
    completeExerciseDetails,
    loading: loaderPatientGetExerciseStat,
    error: errorPatientGetExerciseStat,
  } = useSelector((state) => state.patientGetExerciseStats);

  const { patientDetails } = useSelector(
    (state) => state.doctorGetMultiplePatients
  );

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [stats, setStats] = useState(null);
  const [referenceNumber, setReferenceNumber] = useState('');

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
    // dispatch(getPatientHistory(patientData.firstname, patientData.lastname));
    // dispatch(
    //   getPatientExerciseStat(patientData.firstname, patientData.lastname)
    // );
    dispatch(getMultiplePatients(patientData.firstname, patientData.lastname));
  };

  const finalizePatient = (e) => {
    e.preventDefault();
    dispatch(getPatientHistory(referenceNumber));
    dispatch(getPatientExerciseStat(referenceNumber));
  };

  const dateSubmitHandler = (e) => {
    dispatch(doctorGetPateientExerciseStats(fromDate, toDate, referenceNumber));
    e.preventDefault();
  };

  useEffect(() => {
    if (completeExerciseDetails) {
      const statsArray = generateStatisticsOptimized(completeExerciseDetails);
      setStats([...statsArray]);
    }
  }, [completeExerciseDetails]);
  return (
    <div className='patient-history-container'>
      {loadingDoctorGetPatientHistory && <Loader />}
      {errorDoctorGetPatientHistory && (
        <Error>
          <h3>{errorDoctorGetPatientHistory}</h3>
        </Error>
      )}
      <h3>Search for patient based on firstname and Lastname</h3>
      <form onSubmit={submitHandler} className='get-patient-details-form'>
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
        <button type='submit' className='get-patient-details'>
          Search Patient
        </button>
      </form>
      {patientDetails && patientDetails.length > 0 && (
        <section className='patient-reference-section'>
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Email</th>
                <th>Patient Reference Number</th>
              </tr>
            </thead>
            <tbody>
              {patientDetails.map((singlePatient, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {singlePatient.firstname.toUpperCase()}
                      {} {singlePatient.lastname.toUpperCase()}
                    </td>
                    <td>{singlePatient.email}</td>
                    <td>{singlePatient._id}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}
      <section className='finalize-patient-section'>
        <form onSubmit={finalizePatient}>
          <label htmlFor='finalizedpatient'>Enter Reference Number</label>
          <input
            type='text'
            name='finalizedpatient'
            className='get-ref-num-input'
            onChange={(e) => setReferenceNumber(e.target.value)}
          />
          <button type='submit' className='setPatient'>
            Get History
          </button>
        </form>
      </section>
      {patientHistory && (
        <>
          <div className='patient-details-container'>
            <div className='patient-avatar'>
              <img
                src='./images/female-profile.png'
                alt='patient'
                height='300px'
                width='300px'
              />
            </div>
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
              <span>
                Date of Birth:{' '}
                {new Date(patientHistory.patientDetails.dob)
                  .toISOString()
                  .substring(0, 10)}
              </span>
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
              <div className='medical-details'>
                <h3>Medical Details</h3>
                <span>Age: {patientHistory.patientDetails.age}</span>
              </div>
            </div>
          </div>
          <div className='patient-stat-screen-container'>
            {loaderPatientGetExerciseStat && <Loader />}
            {errorPatientGetExerciseStat && (
              <Error>
                <h3>{errorPatientGetExerciseStat}</h3>
              </Error>
            )}
            <h1>Statistics Screen</h1>
            <section className='date-range-form'>
              <form onSubmit={dateSubmitHandler} className='date-form'>
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
                      {stats && (
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
        </>
      )}
    </div>
  );
};

export default DoctorCheckPatientHistoryScreen;
