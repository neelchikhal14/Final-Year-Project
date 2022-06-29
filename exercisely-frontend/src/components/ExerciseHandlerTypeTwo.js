import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ExerciseTypeTwo from './ExerciseTypeTwo';

const ExerciseHandlerTypeTwo = ({ exercise }) => {
  const [requiredReps, setRequiredReps] = useState(10);
  return (
    <div>
      <ExerciseTypeTwo exercise={exercise} requiredReps={requiredReps} />
    </div>
  );
};

export default ExerciseHandlerTypeTwo;
