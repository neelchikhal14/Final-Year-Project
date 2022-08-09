import {
  DOCTOR_FETCH_PATIENT_FAIL,
  DOCTOR_FETCH_PATIENT_REQUEST,
  DOCTOR_FETCH_PATIENT_SUCCESS,
  DOCTOR_GET_EXERCISE_FAIL,
  DOCTOR_GET_EXERCISE_REQUEST,
  DOCTOR_GET_EXERCISE_SUCCESS,
  DOCTOR_SET_EXERCISE_REQUEST,
  DOCTOR_SET_EXERCISE_SUCCESS,
  DOCTOR_SET_EXERCISE_FAIL,
  DOCTOR_CHECK_MEDICAL_RECORD_FAIL,
  DOCTOR_CHECK_MEDICAL_RECORD_REQUEST,
  DOCTOR_CHECK_MEDICAL_RECORD_SUCCESS,
  DOCTOR_CREATE_MEDICAL_RECORD_REQUEST,
  DOCTOR_CREATE_MEDICAL_RECORD_SUCCESS,
  DOCTOR_CREATE_MEDICAL_RECORD_FAIL,
  DOCTOR_RETRIEVE_MESSAGES_FAIL,
  DOCTOR_RETRIEVE_MESSAGES_REQUEST,
  DOCTOR_RETRIEVE_MESSAGES_SUCCESS,
  DOCTOR_GET_HISTORY_FAIL,
  DOCTOR_GET_HISTORY_REQUEST,
  DOCTOR_GET_HISTORY_SUCCESS,
  DOCTOR_REGISTER_DETAILS_REQUEST,
  DOCTOR_REGISTER_DETAILS_SUCCESS,
  DOCTOR_REGISTER_DETAILS_FAIL,
  DOCTOR_CHECK_DETAILS_EXISTS_FAIL,
  DOCTOR_CHECK_DETAILS_EXISTS_REQUEST,
  DOCTOR_CHECK_DETAILS_EXISTS_SUCCESS,
  DOCTOR_GET_MULTIPLE_PATIENTS_FAIL,
  DOCTOR_GET_MULTIPLE_PATIENTS_REQUEST,
  DOCTOR_GET_MULTIPLE_PATIENTS_SUCCESS,
  DOCTOR_GET_MULTIPLE_PATIENTS_CLEAR,
  DOCTOR_UPDATE_EXERCISE_CLEAR,
  DOCTOR_UPDATE_EXERCISE_FAIL,
  DOCTOR_UPDATE_EXERCISE_REQUEST,
  DOCTOR_UPDATE_EXERCISE_SUCCESS,
  DOCTOR_UPDATE_EFFECT_SUCCESS,
  DOCTOR_DELETE_EXERCISE_REQUEST,
  DOCTOR_DELETE_EXERCISE_SUCCESS,
  DOCTOR_DELETE_EFFECT_SUCCESS,
  DOCTOR_DELETE_EXERCISE_CLEAR,
  DOCTOR_DELETE_EXERCISE_FAIL,
} from '../constants/doctorConstants';

export const doctorFetchPatientReducer = (state = { state: {} }, action) => {
  switch (action.type) {
    case DOCTOR_FETCH_PATIENT_REQUEST:
      return {
        loading: true,
      };
    case DOCTOR_FETCH_PATIENT_SUCCESS:
      return {
        patient: action.payload,
        loading: false,
      };
    case DOCTOR_FETCH_PATIENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const doctorGetExercisesReducer = (state = { state: {} }, action) => {
  switch (action.type) {
    case DOCTOR_GET_EXERCISE_REQUEST:
      return {
        loading: true,
      };
    case DOCTOR_GET_EXERCISE_SUCCESS:
      return {
        exercises: action.payload,
        loading: false,
      };
    case DOCTOR_GET_EXERCISE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const doctorSetExerciseReducer = (state = { state: {} }, action) => {
  switch (action.type) {
    case DOCTOR_SET_EXERCISE_REQUEST:
      return {
        loading: true,
      };
    case DOCTOR_SET_EXERCISE_SUCCESS:
      return {
        status: action.payload,
        loading: false,
      };
    case DOCTOR_SET_EXERCISE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const doctorCheckMedicalRecordReducer = (
  state = { state: {} },
  action
) => {
  switch (action.type) {
    case DOCTOR_CHECK_MEDICAL_RECORD_REQUEST:
      return {
        loading: true,
      };
    case DOCTOR_CHECK_MEDICAL_RECORD_SUCCESS:
      return {
        status: action.payload,
        loading: false,
      };
    case DOCTOR_CHECK_MEDICAL_RECORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const doctorCreateMedicalRecordReducer = (
  state = { state: {} },
  action
) => {
  switch (action.type) {
    case DOCTOR_CREATE_MEDICAL_RECORD_REQUEST:
      return {
        loading: true,
      };
    case DOCTOR_CREATE_MEDICAL_RECORD_SUCCESS:
      return {
        recordStatus: action.payload,
        loading: false,
      };
    case DOCTOR_CREATE_MEDICAL_RECORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const doctorRetrieveMessagesReducer = (
  state = { state: {} },
  action
) => {
  switch (action.type) {
    case DOCTOR_RETRIEVE_MESSAGES_REQUEST:
      return {
        loading: true,
      };
    case DOCTOR_RETRIEVE_MESSAGES_SUCCESS:
      return {
        patientMessages: action.payload,
        loading: false,
      };
    case DOCTOR_RETRIEVE_MESSAGES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const doctorGetPatientHistoryReducer = (
  state = { state: {} },
  action
) => {
  switch (action.type) {
    case DOCTOR_GET_HISTORY_REQUEST:
      return {
        loading: true,
      };
    case DOCTOR_GET_HISTORY_SUCCESS:
      return {
        patientHistory: action.payload,
        loading: false,
      };
    case DOCTOR_GET_HISTORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const doctorRegisterPersonalDetailsReducer = (
  state = { state: {} },
  action
) => {
  switch (action.type) {
    case DOCTOR_REGISTER_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case DOCTOR_REGISTER_DETAILS_SUCCESS:
      return {
        docPersonalDetails: action.payload,
        loading: false,
      };
    case DOCTOR_CHECK_DETAILS_EXISTS_REQUEST:
      return { loading: true };
    case DOCTOR_CHECK_DETAILS_EXISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        detailsExists: action.payload,
      };
    case DOCTOR_CHECK_DETAILS_EXISTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const doctorGetMultiplePatientsReducer = (
  state = { state: {} },
  action
) => {
  switch (action.type) {
    case DOCTOR_GET_MULTIPLE_PATIENTS_REQUEST:
      return {
        loading: true,
      };
    case DOCTOR_GET_MULTIPLE_PATIENTS_SUCCESS:
      return {
        patientDetails: action.payload,
        loading: false,
      };
    case DOCTOR_GET_MULTIPLE_PATIENTS_CLEAR:
      return { state: {} };

    case DOCTOR_GET_MULTIPLE_PATIENTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const doctorUpdatePatientExerciseReducer = (
  state = { state: { updateDetails: {}, updateEffect: {} } },
  action
) => {
  switch (action.type) {
    case DOCTOR_UPDATE_EXERCISE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DOCTOR_UPDATE_EXERCISE_SUCCESS:
      return {
        ...state,
        updateDetails: action.payload,
        loading: false,
      };
    case DOCTOR_UPDATE_EFFECT_SUCCESS:
      return {
        ...state,
        updateEffect: action.payload,
        loading: false,
      };
    case DOCTOR_UPDATE_EXERCISE_CLEAR:
      return { state: {} };

    case DOCTOR_UPDATE_EXERCISE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const doctorDeletePatientExerciseReducer = (
  state = { state: { deleteDetails: {}, deleteEffect: {} } },
  action
) => {
  switch (action.type) {
    case DOCTOR_DELETE_EXERCISE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DOCTOR_DELETE_EXERCISE_SUCCESS:
      return {
        ...state,
        deleteDetails: action.payload,
        loading: false,
      };
    case DOCTOR_DELETE_EFFECT_SUCCESS:
      return {
        ...state,
        deleteEffect: action.payload,
        loading: false,
      };
    case DOCTOR_DELETE_EXERCISE_CLEAR:
      return { state: {} };

    case DOCTOR_DELETE_EXERCISE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
