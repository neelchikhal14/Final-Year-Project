import React, { useState, useEffect } from 'react';
import Exercise from './Exercise';
import './ExerciseHandler.css';

let interval;
const ExerciseHandler = () => {
  const [ready, setReady] = useState(false);
  const [duration, setDuration] = useState(10);
  useEffect(() => {
    if (ready) {
      interval = setInterval(() => {
        if (duration !== 0) {
          setDuration((prevProps) => prevProps - 1);
        }
      }, 1000);
    } else {
      console.log('ready from handler is false');
    }

    return () => {
      clearInterval(interval);
    };
  }, [ready, duration]);

  return (
    <div className='handler-container'>
      <div>
        <Exercise setReady={setReady} duration={duration} />
      </div>
    </div>
  );
};

export default ExerciseHandler;
