import {
  PATIENT_EXERCISE_FAIL,
  PATIENT_EXERCISE_REQUEST,
  PATIENT_EXERCISE_SUCCESS,
  PATIENT_PENDING_EXERCISES_REQUEST,
  PATIENT_SELECTED_EXERCISE,
  PATIENT_UPDATE_EXERCISE_STATS_FAIL,
  PATIENT_UPDATE_EXERCISE_STATS_REQUEST,
  PATIENT_UPDATE_EXERCISE_STATS_SUCCESS,
} from '../constants/patientConstants';

import axios from 'axios';

export const getAllExercises = () => async (dispatch, getState) => {
  try {
    let promises = [];

    dispatch({
      type: PATIENT_EXERCISE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {
      data: {
        patientId: { _id },
      },
    } = await axios.get(`/api/v1/patient/getId/${userInfo._id}`, config);
    // console.log(_id);
    const { data } = await axios.get(
      `/api/v1/patient/getPendingExercises/${_id}`,
      config
    );

    dispatch({
      type: PATIENT_PENDING_EXERCISES_REQUEST,
      payload: data,
    });
    async function getNames() {
      for (const ex of data.pendingExercises) {
        const result = await axios.get(
          `/api/v1/exercise/${ex.exerciseId}`,
          config
        );
        promises.push(result);
      }
      const results = await Promise.all(promises);
      const exercises = results.map((result) => result.data);
      return exercises;
    }
    const theExercises = await getNames();
    dispatch({
      type: PATIENT_EXERCISE_SUCCESS,
      payload: theExercises,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_EXERCISE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const setSelectedExercise = (exercise) => async (dispatch) => {
  dispatch({
    type: PATIENT_SELECTED_EXERCISE,
    payload: exercise,
  });
};

export const updateExerciseStats =
  (exid, stats) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PATIENT_UPDATE_EXERCISE_STATS_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const {
        data: {
          patientId: { _id },
        },
      } = await axios.get(`/api/v1/patient/getId/${userInfo._id}`, config);
      // console.log(_id);
      const { data } = await axios.put(
        `/api/v1/patient/${_id}/updateExerciseStats`,
        { exid, stats },
        config
      );
      dispatch({
        type: PATIENT_UPDATE_EXERCISE_STATS_SUCCESS,
        payload: data.status,
      });
    } catch (error) {
      dispatch({
        type: PATIENT_UPDATE_EXERCISE_STATS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
