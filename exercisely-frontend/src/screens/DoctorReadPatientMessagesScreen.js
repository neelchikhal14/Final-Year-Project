import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getPatientMessages } from '../actions/doctorActions';

import './css/DoctorReadPatientMessagesScreen.css';
const DoctorReadPatientMessagesScreen = () => {
  const dispatch = useDispatch();
  const { patientMessages } = useSelector(
    (state) => state.doctorRetrieveMessages
  );
  useEffect(() => {
    dispatch(getPatientMessages());
  }, [dispatch]);
  const [currrentMsgId, setCurrrentMsgId] = useState('');
  const [currentMessage, setCurrentMessage] = useState({});

  const handleClick = (e) => {
    setCurrrentMsgId(e.target.classList[0]);
  };
  useEffect(() => {
    if (patientMessages) {
      setCurrentMessage(
        patientMessages.filter((msg) => msg.id === currrentMsgId)
      );
    }
  }, [currrentMsgId, patientMessages]);

  return (
    <div className='patient-messages-container'>
      {patientMessages && patientMessages.length > 0 ? (
        <>
          <div className='patient-list-container'>
            {patientMessages.map((msgs) => (
              <div key={msgs.id} className='patient-list-item'>
                <button onClick={(e) => handleClick(e)} className={msgs.id}>
                  <div className={msgs.id + ' avatar'}>
                    <img src='./images/female-avatar.png' alt='patient' />
                  </div>
                  <div className={msgs.id + ' sender-details'}>
                    <span className={msgs.id}>
                      First Name: {msgs.sender.fName}
                    </span>
                    <span className={msgs.id}>
                      Last Name: {msgs.sender.lName}
                    </span>
                    <span className={msgs.id}>Email: {msgs.sender.email}</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
          <div className='patient-message'>
            {currrentMsgId !== '' && currentMessage[0] && (
              <>
                <h3>
                  Date :{' '}
                  {new Date(currentMessage[0].sentAt)
                    .toISOString()
                    .substring(0, 10)}
                </h3>
                <h4>Subject: </h4>
                <h5>{currentMessage[0].subject}</h5>
                <h4>Body: </h4>
                <h5>{currentMessage[0].body}</h5>
              </>
            )}
          </div>
        </>
      ) : (
        <h3>No messages for you</h3>
      )}
    </div>
  );
};

export default DoctorReadPatientMessagesScreen;
