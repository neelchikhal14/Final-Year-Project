import {
  DOCTOR_FETCH_PATIENT_FAIL,
  DOCTOR_FETCH_PATIENT_REQUEST,
  DOCTOR_FETCH_PATIENT_SUCCESS,
  DOCTOR_GET_EXERCISE_FAIL,
  DOCTOR_GET_EXERCISE_REQUEST,
  DOCTOR_GET_EXERCISE_SUCCESS,
  DOCTOR_SET_EXERCISE_FAIL,
  DOCTOR_SET_EXERCISE_REQUEST,
  DOCTOR_SET_EXERCISE_SUCCESS,
  DOCTOR_CHECK_MEDICAL_RECORD_FAIL,
  DOCTOR_CHECK_MEDICAL_RECORD_REQUEST,
  DOCTOR_CHECK_MEDICAL_RECORD_SUCCESS,
  DOCTOR_CREATE_MEDICAL_RECORD_FAIL,
  DOCTOR_CREATE_MEDICAL_RECORD_REQUEST,
  DOCTOR_CREATE_MEDICAL_RECORD_SUCCESS,
  DOCTOR_RETRIEVE_MESSAGES_FAIL,
  DOCTOR_RETRIEVE_MESSAGES_REQUEST,
  DOCTOR_RETRIEVE_MESSAGES_SUCCESS,
  DOCTOR_GET_HISTORY_FAIL,
  DOCTOR_GET_HISTORY_REQUEST,
  DOCTOR_GET_HISTORY_SUCCESS,
} from '../constants/doctorConstants';

import axios from 'axios';

export const fetchPatient = (patientDetails) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_FETCH_PATIENT_REQUEST,
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

    const { data } = await axios.get(
      `/api/v1/doctor/getPatient/${patientDetails.firstname}/${patientDetails.lastname}`,
      config
    );

    dispatch({
      type: DOCTOR_FETCH_PATIENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_FETCH_PATIENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getExercises = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_GET_EXERCISE_REQUEST,
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

    const { data } = await axios.get(`/api/v1/exercise/`, config);

    dispatch({
      type: DOCTOR_GET_EXERCISE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_GET_EXERCISE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const checkMedicalRecord = (pid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_CHECK_MEDICAL_RECORD_REQUEST,
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
    console.log('triggered');
    const response = await axios.get(
      `/api/v1/doctor/${pid}/checkMedicalRecords`,
      config
    );

    if (response.status === 200) {
      dispatch({
        type: DOCTOR_CHECK_MEDICAL_RECORD_SUCCESS,
        payload: 'Record Exists',
      });
    }
  } catch (error) {
    dispatch({
      type: DOCTOR_CHECK_MEDICAL_RECORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const setExercise = (details) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_SET_EXERCISE_REQUEST,
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

    const patient = details.pid;

    const medicalRecordsResponse = await axios.get(
      `/api/v1/doctor/${patient}/checkMedicalRecords`,
      config
    );

    if (medicalRecordsResponse.status === 401) {
      console.log(medicalRecordsResponse);
    }
    if (medicalRecordsResponse.data.record.assignedExercises.length > 0) {
      const newExercises = [
        {
          exerciseId: details.exerciseId,
          desiredValue: details.desiredValue,
          reps: details.reps,
          assignedDate: details.assignedDate,
          duration: details.duration,
          assignedCompletion: details.assignedCompletion,
          status: details.status,
          instructions: details.instructions,
        },
      ];

      const response = await axios.put(
        `/api/v1/doctor/addPatientExercise`,
        { patient, newExercises },
        config
      );
      if (response.status === 200) {
        dispatch({
          type: DOCTOR_SET_EXERCISE_SUCCESS,
          payload: { status: 'Exercise added' },
        });
      }
    }
  } catch (error) {
    dispatch({
      type: DOCTOR_SET_EXERCISE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createMedicalRecord = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_CREATE_MEDICAL_RECORD_REQUEST,
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
        doctor: { _id },
      },
    } = await axios.get(`/api/v1/doctor/${userInfo._id}`, config);

    const {
      doctorFetchPatient: {
        patient: { bioData },
      },
    } = getState();
    console.log(userInfo._id, _id, bioData._id);
    const { data } = await axios.post(
      `/api/v1/doctor/createMedicalRecord`,
      { pid: bioData._id, docId: _id },
      config
    );
    if (data) {
      dispatch({
        type: DOCTOR_CREATE_MEDICAL_RECORD_SUCCESS,
        payload: 'Record Created',
      });
    }
  } catch (error) {
    dispatch({
      type: DOCTOR_CREATE_MEDICAL_RECORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getPatientMessages = () => async (dispatch, getState) => {
  try {
    let promises = [];
    dispatch({
      type: DOCTOR_RETRIEVE_MESSAGES_REQUEST,
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

    //get doctor's id from Doctor's Table
    const {
      data: { doctor },
    } = await axios.get(`/api/v1/doctor/${userInfo._id}`, config);
    const {
      data: { messages },
    } = await axios.get(`/api/v1/doctor/${doctor._id}/readMessages`, config);

    async function getSendersDetails() {
      for (const sender of messages) {
        const result = await axios.get(`/api/v1/users/${sender.from}`, config);
        promises.push(result);
      }
      const results = await Promise.all(promises);
      const sDetails = results.map((result) => result.data);
      return sDetails;
    }

    const senderDetails = await getSendersDetails();

    const finalMessages = [];
    messages.forEach((msg) => {
      const sender = senderDetails[0];
      finalMessages.push({
        sender: {
          fName: sender.firstname,
          lName: sender.lastname,
          email: sender.email,
        },
        subject: msg.subject,
        body: msg.messageBody,
        sentAt: msg.createdAt,
        id: msg._id,
      });
    });

    if (messages) {
      dispatch({
        type: DOCTOR_RETRIEVE_MESSAGES_SUCCESS,
        payload: finalMessages,
      });
    }
  } catch (error) {
    dispatch({
      type: DOCTOR_RETRIEVE_MESSAGES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getPatientHistory =
  (fname, lname) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_GET_HISTORY_REQUEST,
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

      const { data } = await axios.get(
        `/api/v1/doctor/checkPatientHistory/${fname}/${lname}`,
        config
      );
      console.log(data);

      dispatch({
        type: DOCTOR_GET_HISTORY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DOCTOR_GET_HISTORY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
