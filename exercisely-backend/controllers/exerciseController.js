import asyncHandler from 'express-async-handler';
import Exercise from '../models/exerciseModel.js';

/**
 * * @desc   add exercise
 * * route   POST /api/v1/exercise/add
 * ! @access PROTECTED
 */
export const addExercise = asyncHandler(async (req, res) => {
  const { name, bodyParams, repsRequired } = req.body;
  const exerciseExists = await Exercise.findOne({ name });

  if (exerciseExists) {
    res.status(400);
    throw new Error('Exercise already Exists');
  }
  const exercise = await Exercise.create({
    name,
    bodyParams: [...bodyParams],
    repsRequired,
  });
  if (exercise) {
    res.status(201).json({
      _id: exercise._id,
      name: exercise.name,
      bodyParams: exercise.bodyParams,
      repsRequired: exercise.repsRequired,
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});
/**
 * * @desc   add exercise
 * * route   GET /api/v1/exercise/
 * ! @access PROTECTED
 */
export const getAllExercises = asyncHandler(async (req, res) => {
  const exercises = await Exercise.find({});

  if (exercises) {
    res.json(exercises);
  } else {
    res.status(401);
    throw new Error('Exercises not found');
  }
});
/**
 * * @desc   Get Exercise details by id
 * * route   GET /api/v1/exercise/:id
 * ! @access PROTECTED
 */
export const getExerciseById = asyncHandler(async (req, res) => {
  const exercise = await Exercise.findOne({ _id: req.params.id });
  const { _doc } = { ...exercise };
  if (exercise) {
    res.json({ ..._doc });
  } else {
    res.status(401);
    throw new Error('Exercise not found');
  }
});
