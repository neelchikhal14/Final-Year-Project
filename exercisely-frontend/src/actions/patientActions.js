import {
  PATIENT_EXERCISE_FAIL,
  PATIENT_EXERCISE_REQUEST,
  PATIENT_EXERCISE_SUCCESS,
  PATIENT_PENDING_EXERCISES_REQUEST,
  PATIENT_SELECTED_EXERCISE,
  PATIENT_UPDATE_EXERCISE_STATS_FAIL,
  PATIENT_UPDATE_EXERCISE_STATS_REQUEST,
  PATIENT_UPDATE_EXERCISE_STATS_SUCCESS,
  PATIENT_SEND_MESSAGE_REQUEST,
  PATIENT_SEND_MESSAGE_SUCCESS,
  PATIENT_SEND_MESSAGE_FAIL,
  PATIENT_EXERCISE_STATS_FAIL,
  PATIENT_EXERCISE_STATS_REQUEST,
  PATIENT_EXERCISE_STATS_SUCCESS,
  PATIENT_REGISTER_BASIC_DETAILS_FAIL,
  PATIENT_REGISTER_BASIC_DETAILS_REQUEST,
  PATIENT_REGISTER_BASIC_DETAILS_SUCCESS,
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
  (assignedDate, stats) => async (dispatch, getState) => {
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
        { assignedDate, stats },
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
export const sendMessage = (subject, body) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_SEND_MESSAGE_REQUEST,
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
    // console.log(userInfo);
    const {
      data: { patientId },
    } = await axios.get(`/api/v1/patient/getId/${userInfo._id}`, config);

    const {
      data: { docId },
    } = await axios.get(`/api/v1/patient/getDocId/${patientId._id}`, config);

    const { data } = await axios.post(
      `/api/v1/patient/sendmessage`,
      { from: userInfo._id, to: docId.doctor, subject, messageBody: body },
      config
    );

    dispatch({
      type: PATIENT_SEND_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_SEND_MESSAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getExercisesStats = (from, to) => async (dispatch, getState) => {
  try {
    let promises = [];

    dispatch({
      type: PATIENT_EXERCISE_STATS_REQUEST,
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
    console.log(from, to);
    const { data } = await axios.get(
      `/api/v1/patient/${_id}/getExerciseStats/${from}/${to}`,
      config
    );
    // console.log(data.stats);

    async function getExerciseDetails() {
      for (const ex of data.stats) {
        const result = await axios.get(
          `/api/v1/exercise/${ex.exerciseDetails.exerciseId}`,
          config
        );
        promises.push(result);
      }
      const results = await Promise.all(promises);
      const exercises = results.map((result) => result.data);
      return exercises;
    }

    const theExercises = await getExerciseDetails();
    // console.log(theExercises);
    const finalExerciseData = [];
    data.stats.forEach((ex, idx) => {
      const exInfo = theExercises[idx];
      finalExerciseData.push({ ...ex.exerciseDetails, exInfo });
    });
    console.log(finalExerciseData);
    dispatch({
      type: PATIENT_EXERCISE_STATS_SUCCESS,
      payload: finalExerciseData,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_EXERCISE_STATS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const registerBasicDetails = (details) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_REGISTER_BASIC_DETAILS_REQUEST,
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

    const { data } = await axios.post(
      '/api/v1/patient/register-patient/basicdetails',
      {
        bio: userInfo._id,
        age: details.age,
        address: details.address,
        gender: details.gender,
        dob: details.dob,
        homeTelephone: details.homeTelephone,
        mobileTelephone: details.mobileTelephone,
        nextOfKin: details.nextOfKin,
        maritalStatus: details.maritalStatus,
      },
      config
    );

    dispatch({
      type: PATIENT_REGISTER_BASIC_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_REGISTER_BASIC_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
