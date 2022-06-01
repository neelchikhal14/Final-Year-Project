import React, { useState, useEffect } from 'react';
import ExerciseTypeOne from './ExerciseTypeOne';
import './ExerciseHandlerTypeOne.css';

let interval;
const ExerciseHandlerTypeOne = ({ exercise }) => {
  const [ready, setReady] = useState(false);
  const [duration, setDuration] = useState(40);

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
        <ExerciseTypeOne
          setReady={setReady}
          duration={duration}
          exercise={exercise}
        />
      </div>
    </div>
  );
};

export default ExerciseHandlerTypeOne;
