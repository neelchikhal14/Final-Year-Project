import React, { useState, useEffect } from 'react';

import './App.css';
import ExerciseHandlerTypeOne from './components/ExerciseHandlerTypeOne';
import ExerciseHandlerTypeTwo from './components/ExerciseHandlerTypeTwo';
const App = () => {
  const [displayTypeOne, setDisplayTypeOne] = useState(false);
  const [displayTypeTwo, setDisplayTypeTwo] = useState(false);
  const [exercise, setExercise] = useState('bicepCurl');
  useEffect(() => {
    if (exercise === 'rightTreePose') {
      setDisplayTypeOne(true);
      setDisplayTypeTwo(false);
    } else if (exercise === 'bicepCurl') {
      setDisplayTypeOne(false);
      setDisplayTypeTwo(true);
    }
  }, [exercise]);

  return (
    <div>
      {displayTypeOne && <ExerciseHandlerTypeOne exercise={exercise} />}
      {displayTypeTwo && <ExerciseHandlerTypeTwo exercise={exercise} />}
    </div>
  );
};

export default App;
