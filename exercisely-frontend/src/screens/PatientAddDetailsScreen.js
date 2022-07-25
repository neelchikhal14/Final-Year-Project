import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerBasicDetails } from '../actions/patientActions';

import './css/PatientAddDetailsScreen.css';
const PatientAddDetailsScreen = ({ history }) => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(true);

  const [patientDetails, setPatientDetails] = useState({
    age: 0,
    country: '',
    city: '',
    addressLine: '',
    postalCode: '',
    gender: 'man',
    dob: new Date(),
    homeTelephone: '',
    mobileTelephone: '',
    name: '',
    telephone: '',
    relationship: '',
    marital: 'single',
  });
  const { assignedExercises } = useSelector(
    (state) => state.patientAssignedExercises
  );
  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPatientDetails({ ...patientDetails, [name]: value });
  };
  const registerDetailsHandler = (e) => {
    console.log('submitted');
    const localDob = new Date(patientDetails.dob);
    const details = {
      age: patientDetails.age,
      address: {
        country: patientDetails.country,
        city: patientDetails.city,
        addressLine: patientDetails.addressLine,
        postalCode: patientDetails.postalCode,
      },
      gender: patientDetails.gender,
      dob: localDob.toISOString(),
      homeTelephone: patientDetails.homeTelephone,
      mobileTelephone: patientDetails.mobileTelephone,
      nextOfKin: {
        name: patientDetails.name,
        telephone: patientDetails.telephone,
        relationship: patientDetails.relationship,
      },
      maritalStatus: patientDetails.marital,
    };
    // console.log(details);
    dispatch(registerBasicDetails(details));
    history.push('/patient-dashboard');
    e.preventDefault();
  };

  useEffect(() => {
    if (assignedExercises.length > 0) {
      setShowRegistrationForm(false);
    }
  }, [assignedExercises]);

  return (
    <div className='add-details-container'>
      {showRegistrationForm ? (
        <>
          <h1>Fill Your Details</h1>
          <form onSubmit={registerDetailsHandler} className='details-form'>
            <label htmlFor='age'>Age</label>
            <input
              type='number'
              name='age'
              placeholder='Enter Age'
              min={0}
              value={patientDetails.age}
              onChange={handleOnChange}
              required
            />

            <label htmlFor='country'>Country</label>
            <input
              type='text'
              name='country'
              placeholder='Enter Country'
              value={patientDetails.country}
              onChange={handleOnChange}
              required
            />
            <label htmlFor='city'>City</label>
            <input
              type='text'
              name='city'
              placeholder='Enter City'
              value={patientDetails.city}
              onChange={handleOnChange}
              required
            />
            <label htmlFor='addressLine'>Address Line</label>
            <input
              type='text'
              name='addressLine'
              placeholder='Enter Address'
              value={patientDetails.addressLine}
              onChange={handleOnChange}
              required
            />
            <label htmlFor='postalCode'>Postal Code</label>
            <input
              type='text'
              name='postalCode'
              placeholder='Enter Postal Code'
              value={patientDetails.postalCode}
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
                  checked={patientDetails.gender === 'man'}
                  onChange={handleOnChange}
                />
                <label htmlFor='gender'>Male</label>
              </div>

              <div>
                <input
                  type='radio'
                  name='gender'
                  value='woman'
                  checked={patientDetails.gender === 'woman'}
                  onChange={handleOnChange}
                />
                <label htmlFor='gender'>Female</label>
              </div>

              <div>
                <input
                  type='radio'
                  name='gender'
                  value='transgender man'
                  checked={patientDetails.gender === 'transgender man'}
                  onChange={handleOnChange}
                />
                <label htmlFor='gender'>Transgender Man</label>
              </div>

              <div>
                <input
                  type='radio'
                  name='gender'
                  value='transgender woman'
                  checked={patientDetails.gender === 'transgender woman'}
                  onChange={handleOnChange}
                />
                <label htmlFor='gender'>Transgender Female</label>
              </div>
            </div>

            <label htmlFor='dob'>Date of Birth</label>
            <input
              type='date'
              id='dob'
              name='dob'
              value={patientDetails.dob}
              onChange={handleOnChange}
            />
            <label htmlFor='homeTelephone'>Home Telephone</label>
            <input
              type='text'
              name='homeTelephone'
              placeholder='Enter Home Telephone'
              value={patientDetails.homeTelephone}
              onChange={handleOnChange}
              required
            />
            <label htmlFor='mobileTelephone'>Mobile Telephone</label>
            <input
              type='text'
              name='mobileTelephone'
              placeholder='Enter Mobile Telephone'
              value={patientDetails.mobileTelephone}
              onChange={handleOnChange}
              required
            />

            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              placeholder='Enter Name'
              value={patientDetails.name}
              onChange={handleOnChange}
              required
            />
            <label htmlFor='telephone'>Telephone</label>
            <input
              type='text'
              name='telephone'
              placeholder='Enter Telephone'
              value={patientDetails.telephone}
              onChange={handleOnChange}
              required
            />
            <label htmlFor='relationship'>Relationship</label>
            <input
              type='text'
              name='relationship'
              placeholder='Enter Relationship'
              value={patientDetails.relationship}
              onChange={handleOnChange}
              required
            />
            <label htmlFor='martial-status-container'>Marital Status</label>
            <div
              className='martial-status-container'
              name='martial-status-container'
            >
              <div>
                <input
                  type='radio'
                  name='marital'
                  id='marital'
                  value='single'
                  checked={patientDetails.marital === 'single'}
                  onChange={handleOnChange}
                />
                <label htmlFor='marital'>Single</label>
              </div>

              <div>
                <input
                  type='radio'
                  name='marital'
                  id='marital'
                  value='married'
                  checked={patientDetails.marital === 'married'}
                  onChange={handleOnChange}
                />
                <label htmlFor='marital'>Married</label>
              </div>

              <div>
                <input
                  type='radio'
                  name='marital'
                  id='marital'
                  value='divorced'
                  checked={patientDetails.marital === 'divorced'}
                  onChange={handleOnChange}
                />
                <label htmlFor='marital'>Divorced</label>
              </div>
            </div>
            <button type='submit' className='register-details-button'>
              Register Details
            </button>
          </form>
        </>
      ) : (
        <h3>Your Details are already Registered</h3>
      )}
    </div>
  );
};

export default PatientAddDetailsScreen;
