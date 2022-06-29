import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage } from '../actions/patientActions';

import './css/PatientSendMessageScreen.css';
const PatientSendMessageScreen = ({ history }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.patientSendMessage);

  const submitHandler = () => {
    dispatch(sendMessage(subject, body));
    history.push('/patient-dashboard');
  };
  return (
    <div>
      {loading && <h2>Loading</h2>}
      {error && <h2>error</h2>}
      <h2>Send A Message To Your Doctor</h2>
      <form onSubmit={submitHandler}>
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
        <button type='submit'>Send Message</button>
      </form>
    </div>
  );
};

export default PatientSendMessageScreen;
