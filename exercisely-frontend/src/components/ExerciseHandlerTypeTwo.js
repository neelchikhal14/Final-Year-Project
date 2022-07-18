import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ExerciseScreenTypeTwo from '../screens/ExerciseScreenTypeTwo';
import ExerciseTypeTwo from './ExerciseTypeTwo';

const ExerciseHandlerTypeTwo = () => {
  const [requiredReps, setRequiredReps] = useState(10);
  const { selectedExercise } = useSelector(
    (state) => state.patientSelectExercises
  );
  return (
    <div>
      <ExerciseScreenTypeTwo />
    </div>
  );
};

export default ExerciseHandlerTypeTwo;
