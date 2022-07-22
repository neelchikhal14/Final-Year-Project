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
      {patientMessages ? (
        <>
          <div className='patient-list-container'>
            {patientMessages.map((msgs) => (
              <div key={msgs.id} className='patient-list-item'>
                <button onClick={(e) => handleClick(e)} className={msgs.id}>
                  <div className={msgs.id + ' avatar'}></div>
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
                <h3>Time : {currentMessage[0].sentAt}</h3>
                <h3>Subject: </h3>
                <h2>{currentMessage[0].subject}</h2>
                <h3>Body: </h3>
                <h2>{currentMessage[0].body}</h2>
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
