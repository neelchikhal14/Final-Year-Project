import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage } from '../actions/patientActions';

import Loader from '../components/Loader';
import Error from '../components/Error';

import './css/PatientSendMessageScreen.css';
const PatientSendMessageScreen = ({ history }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();

  const { loading: loadingPatientSendMessage, error: errorPatientSendMessage } =
    useSelector((state) => state.patientSendMessage);

  const submitHandler = () => {
    dispatch(sendMessage(subject, body));
    history.push('/patient-dashboard');
  };
  return (
    <div className='send-message-container'>
      <h1>Send A Message To Your Doctor</h1>
      {loadingPatientSendMessage && <Loader />}
      {errorPatientSendMessage && (
        <Error>
          <h3>{errorPatientSendMessage}</h3>
        </Error>
      )}
      <form onSubmit={submitHandler} className='message-form'>
        <label>Subject</label>
        <input
          type='text'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <label>Message</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type='submit' className='send-message-button'>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default PatientSendMessageScreen;
