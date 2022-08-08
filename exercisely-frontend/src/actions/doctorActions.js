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
  DOCTOR_REGISTER_DETAILS_FAIL,
  DOCTOR_REGISTER_DETAILS_REQUEST,
  DOCTOR_REGISTER_DETAILS_SUCCESS,
  DOCTOR_CHECK_DETAILS_EXISTS_REQUEST,
  DOCTOR_CHECK_DETAILS_EXISTS_FAIL,
  DOCTOR_CHECK_DETAILS_EXISTS_SUCCESS,
  DOCTOR_GET_MULTIPLE_PATIENTS_CLEAR,
  DOCTOR_GET_MULTIPLE_PATIENTS_FAIL,
  DOCTOR_GET_MULTIPLE_PATIENTS_REQUEST,
  DOCTOR_GET_MULTIPLE_PATIENTS_SUCCESS,
  DOCTOR_UPDATE_EXERCISE_CLEAR,
  DOCTOR_UPDATE_EXERCISE_FAIL,
  DOCTOR_UPDATE_EXERCISE_REQUEST,
  DOCTOR_UPDATE_EXERCISE_SUCCESS,
  DOCTOR_UPDATE_EFFECT_SUCCESS,
  DOCTOR_DELETE_EXERCISE_REQUEST,
  DOCTOR_DELETE_EFFECT_SUCCESS,
  DOCTOR_DELETE_EXERCISE_FAIL,
  DOCTOR_DELETE_EXERCISE_SUCCESS,
} from '../constants/doctorConstants';

import axios from 'axios';
import {
  PATIENT_EXERCISE_FAIL,
  PATIENT_EXERCISE_REQUEST,
  PATIENT_EXERCISE_STATS_FAIL,
  PATIENT_EXERCISE_STATS_REQUEST,
  PATIENT_EXERCISE_STATS_SUCCESS,
  PATIENT_EXERCISE_SUCCESS,
  PATIENT_PENDING_EXERCISES_REQUEST,
} from '../constants/patientConstants';

export const fetchPatient = (id) => async (dispatch, getState) => {
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
      `/api/v1/doctor/getPatientByID/${id}`,
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
    if (medicalRecordsResponse.data.record.assignedExercises) {
      const newExercises = [
        {
          exerciseId: details.exerciseId,
          desiredValue: details.desiredValue,
          std: details.std,
          reps: details.reps,
          assignedDate: details.assignedDate,
          duration: Number(details.duration),
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
        const result = await axios.get(
          `/api/v1/users/getUserById/${sender.from}`,
          config
        );
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
export const getPatientHistory = (id) => async (dispatch, getState) => {
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
      `/api/v1/doctor/checkPatientHistory/${id}`,
      config
    );
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

export const getPatientExerciseStat = (id) => async (dispatch, getState) => {
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

    const response = await axios.get(`/api/v1/users/getUserById/${id}`, config);

    const {
      data: {
        patientId: { _id },
      },
    } = await axios.get(`/api/v1/patient/getId/${response.data._id}`, config);
    console.log(_id);
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
export const doctorGetPateientExerciseStats =
  (from, to, id) => async (dispatch, getState) => {
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
      const response = await axios.get(
        `/api/v1/users/getUserById/${id}`,
        config
      );
      const {
        data: {
          patientId: { _id },
        },
      } = await axios.get(`/api/v1/patient/getId/${response.data._id}`, config);
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

export const registerPersonalDetails =
  (details) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_REGISTER_DETAILS_REQUEST,
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
        '/api/v1/doctor/register',
        {
          bio: userInfo._id,
          clinicAddress: details.clinicAddress,
          homeAddress: details.homeAddress,
          dob: details.dob,
          workTelephone: details.workTelephone,
          homeTelephone: details.homeTelephone,
          gender: details.gender,
          qualification: details.qualification,
        },
        config
      );

      dispatch({
        type: DOCTOR_REGISTER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DOCTOR_REGISTER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const checkDetailsExists = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_CHECK_DETAILS_EXISTS_REQUEST,
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

    const { data } = await axios.get(`/api/v1/doctor/${userInfo._id}`, config);

    dispatch({
      type: DOCTOR_CHECK_DETAILS_EXISTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_CHECK_DETAILS_EXISTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getMultiplePatients =
  (firstname, lastname) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_GET_MULTIPLE_PATIENTS_REQUEST,
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
        `/api/v1/users/getManyUsers/${firstname}/${lastname}`,
        config
      );

      dispatch({
        type: DOCTOR_GET_MULTIPLE_PATIENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DOCTOR_GET_MULTIPLE_PATIENTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const getPendingExercises = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_FETCH_PATIENT_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    // const { doctorFetchPatient } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const {
      data: { doctor },
    } = await axios.get(`/api/v1/doctor/${userInfo._id}`, config);

    const { data } = await axios.get(
      `/api/v1/doctor/getPatientByID/${id}`,
      config
    );
    console.log(doctor._id);
    dispatch({
      type: DOCTOR_FETCH_PATIENT_SUCCESS,
      payload: { ...data, docId: doctor._id },
    });

    console.log(data);

    dispatch({
      type: DOCTOR_UPDATE_EXERCISE_REQUEST,
    });
    // console.log(doctorFetchPatient);
    const { data: pendingExercises } = await axios.get(
      `/api/v1/patient/getPendingExercises/${data.bioData._id}`,
      config
    );
    // console.log(pendingExercises);

    dispatch({
      type: DOCTOR_UPDATE_EXERCISE_SUCCESS,
      payload: pendingExercises,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_UPDATE_EXERCISE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const setUpdateExercise = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    // const { doctorFetchPatient } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/v1/doctor/getPatientByID/${id}`,
      config
    );

    console.log(data);

    dispatch({
      type: DOCTOR_UPDATE_EXERCISE_REQUEST,
    });
    // console.log(doctorFetchPatient);
    const { data: pendingExercises } = await axios.get(
      `/api/v1/patient/getPendingExercises/${data.bioData._id}`,
      config
    );
    // console.log(pendingExercises);

    dispatch({
      type: DOCTOR_UPDATE_EXERCISE_SUCCESS,
      payload: pendingExercises,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_UPDATE_EXERCISE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateTheExercise = (details) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    // const { doctorFetchPatient } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({
      type: DOCTOR_UPDATE_EXERCISE_REQUEST,
    });

    console.log(details);

    const { data } = await axios.put(
      `/api/v1/doctor/updatePatientExercise`,
      { details },
      config
    );

    console.log(data);

    dispatch({
      type: DOCTOR_UPDATE_EFFECT_SUCCESS,
      payload: { data },
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_UPDATE_EXERCISE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteTheExercise = (details) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    // const { doctorFetchPatient } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({
      type: DOCTOR_DELETE_EXERCISE_REQUEST,
    });

    console.log(details);

    const { data } = await axios.put(
      `/api/v1/doctor/deletePatientExercise`,
      { details },
      config
    );

    console.log(data);

    dispatch({
      type: DOCTOR_DELETE_EXERCISE_SUCCESS,
      payload: { data },
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_DELETE_EXERCISE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
