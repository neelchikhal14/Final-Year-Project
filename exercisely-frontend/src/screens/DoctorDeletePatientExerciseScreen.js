import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../components/Loader';
import Error from '../components/Error';

import {
  deleteTheExercise,
  getExercises,
  getMultiplePatients,
  getPendingExercises,
  updateTheExercise,
} from '../actions/doctorActions';

import './css/DoctorDeletePatientExerciseScreen.css';
const DoctorDeletePatientExerciseScreen = ({ history }) => {
  const [getPatient, setGetPatient] = useState({
    firstname: '',
    lastname: '',
  });
  const onChangeHandlerName = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setGetPatient({ ...getPatient, [name]: value });
  };
  const [exerciseDetails, setExerciseDetails] = useState({
    bodyPart: '',
    angle: 0,
    std: 0,
  });

  const [completeExerciseDetails, setCompleteExerciseDetails] = useState({});
  const [standardDeviation, setStandardDeviation] = useState({});

  const [reps, setReps] = useState(0);
  const [assignedCompletion, setAssignedCompletion] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [instructions, setInstructions] = useState([]);
  const [duration, setDuration] = useState(0);

  const [recordExists, setRecordExists] = useState('');
  const [recordCreated, setRecordCreated] = useState(false);

  const [referenceNumber, setReferenceNumber] = useState('');
  const [exerciseReference, setExerciseReference] = useState('');
  const [updateExercise, setUpdateExercise] = useState({});

  const dispatch = useDispatch();

  const { patient } = useSelector((state) => state.doctorFetchPatient);
  const { status, error } = useSelector(
    (state) => state.doctorCheckMedicalRecord
  );
  const { exercises } = useSelector((state) => state.doctorGetExercises);
  const { recordStatus } = useSelector(
    (state) => state.doctorCreateMedicalRecord
  );

  const {
    patientDetails,
    loading: loadingGetMultiplePatients,
    error: errorGetMultiplePatients,
  } = useSelector((state) => state.doctorGetMultiplePatients);
  const {
    updateDetails,
    loading: loadingDoctorUpdatePatientExercise,
    error: errorDoctorUpdatePatientExercise,
  } = useSelector((state) => state.doctorUpdatePatientExercise);

  const getPatientDetails = (e) => {
    e.preventDefault();
    dispatch(getMultiplePatients(getPatient.firstname, getPatient.lastname));
    // dispatch(fetchPatient(getPatient));
    dispatch(getExercises());
  };

  const finalizePatient = (e) => {
    e.preventDefault();
    dispatch(getPendingExercises(referenceNumber));
  };

  const finalizeExercise = (e) => {
    e.preventDefault();
    const uExercise = [];
    updateDetails.pendingExercises.forEach((ex) => {
      if (ex.assignedDate === exerciseReference) {
        exercises.forEach((singleEx) => {
          if (ex.exerciseId === singleEx._id) {
            uExercise.push({
              baseDetails: singleEx,
              extraDetails: ex,
            });
          }
        });
      }
    });
    // console.log(...uExercise);
    setUpdateExercise(...uExercise);
    const details = {
      exerciseReference,
      pid: patient.bioData._id,
    };
    // console.log(details);
    dispatch(deleteTheExercise(details));
    history.push('/doctor-dashboard');
  };

  useEffect(() => {
    if (status) {
      setRecordExists('Exists');
    }
    if (error) {
      setRecordExists('Not Exists');
    }
  }, [status, error]);
  useEffect(() => {
    if (recordStatus) {
      setRecordCreated(true);
    }
  }, [recordStatus]);

  return (
    <div className='add-exercises-container'>
      <h1>Delete Patient Exercise</h1>
      {loadingGetMultiplePatients && <Loader />}
      {errorGetMultiplePatients && (
        <Error>
          <h3>{errorGetMultiplePatients}</h3>
        </Error>
      )}
      <section className='get-patient-details-section'>
        <h3>Search for patient based on Firstname and Lastname</h3>
        <form onSubmit={getPatientDetails} className='get-patient-form'>
          <label htmlFor='firstname'>Enter Patient's Firstname</label>
          <input
            type='text'
            name='firstname'
            value={getPatient.firstname}
            onChange={onChangeHandlerName}
          />
          <label htmlFor='lastname'>Enter Patient's Lastname</label>
          <input
            type='text'
            name='lastname'
            value={getPatient.lastname}
            onChange={onChangeHandlerName}
          />
          <button type='submit' className='get-patient-button'>
            Get Patient List
          </button>
        </form>
      </section>
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
            Set Patient
          </button>
        </form>
      </section>
      {updateDetails && updateDetails.pendingExercises.length === 0 && (
        <h3>No Pending Exercise</h3>
      )}
      {updateDetails && updateDetails.pendingExercises.length > 0 && (
        <section className='patient-reference-section'>
          <h3>List of Assigned Pending Exercises</h3>
          <table>
            <thead>
              <tr>
                <th>Exercise Name</th>
                <th>Assigned Date</th>
                <th>Reference Number</th>
              </tr>
            </thead>
            <tbody>
              {exercises &&
                updateDetails.pendingExercises.map((singlePendingExercise) => {
                  return exercises.map((ex, idx) => {
                    if (singlePendingExercise.exerciseId === ex._id) {
                      return (
                        <tr key={idx}>
                          <td>{ex.name.toUpperCase()}</td>
                          <td>
                            {new Date(singlePendingExercise.assignedDate)
                              .toISOString()
                              .substring(0, 10)}
                          </td>
                          <td>{singlePendingExercise.assignedDate}</td>
                          {console.log(ex.name)}
                        </tr>
                      );
                    }
                  });
                })}
            </tbody>
          </table>
        </section>
      )}
      {updateDetails && updateDetails.pendingExercises.length > 0 && (
        <section className='finalize-exercise-section'>
          <form onSubmit={finalizeExercise}>
            <label htmlFor='finalizedexercise'>
              Enter Exercise Reference Number
            </label>
            <input
              type='text'
              name='finalizedexercise'
              className='get-ref-num-input'
              onChange={(e) => setExerciseReference(e.target.value)}
            />
            <button type='submit' className='setPatient'>
              Delete Exercise
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default DoctorDeletePatientExerciseScreen;
