import {
  PATIENT_EXERCISE_FAIL,
  PATIENT_EXERCISE_REQUEST,
  PATIENT_EXERCISE_SUCCESS,
  PATIENT_SELECTED_EXERCISE,
  PATIENT_PENDING_EXERCISES_REQUEST,
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
  PATIENT_EXERCISE_CLEAR,
  PATIENT_SELECTED_EXERCISE_CLEAR,
  PATIENT_UPDATE_EXERCISE_STATS_CLEAR,
  PATIENT_SEND_MESSAGE_CLEAR,
  PATIENT_EXERCISE_STATS_CLEAR,
  PATIENT_REGISTER_BASIC_DETAILS_CLEAR,
} from '../constants/patientConstants';

export const patientGetExercisesReducer = (state = { state: {} }, action) => {
  switch (action.type) {
    case PATIENT_EXERCISE_REQUEST:
      return {
        loading: true,
      };
    case PATIENT_EXERCISE_SUCCESS:
      return {
        ...state,
        loading: false,
        assignedExercises: action.payload,
      };
    case PATIENT_PENDING_EXERCISES_REQUEST:
      return {
        ...state,
        loading: false,
        assignedExercisesDetailed: action.payload,
      };

    case PATIENT_EXERCISE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PATIENT_EXERCISE_CLEAR:
      return {};

    default:
      return state;
  }
};
export const patientSelectExercisesReducer = (
  state = { state: {} },
  action
) => {
  switch (action.type) {
    case PATIENT_SELECTED_EXERCISE:
      return {
        selectedExercise: action.payload,
      };
    case PATIENT_SELECTED_EXERCISE_CLEAR:
      return {};

    default:
      return state;
  }
};
export const patientUpdateSessionStatsReducer = (
  state = { state: {} },
  action
) => {
  switch (action.type) {
    case PATIENT_UPDATE_EXERCISE_STATS_REQUEST:
      return {
        loading: true,
      };
    case PATIENT_UPDATE_EXERCISE_STATS_SUCCESS:
      return {
        status: action.payload,
        loading: false,
      };
    case PATIENT_UPDATE_EXERCISE_STATS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PATIENT_UPDATE_EXERCISE_STATS_CLEAR:
      return {};

    default:
      return state;
  }
};
export const patientSendMessageReducer = (state = { state: {} }, action) => {
  switch (action.type) {
    case PATIENT_SEND_MESSAGE_REQUEST:
      return {
        loading: true,
      };
    case PATIENT_SEND_MESSAGE_SUCCESS:
      return {
        messageDetails: action.payload,
        loading: false,
      };
    case PATIENT_SEND_MESSAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PATIENT_SEND_MESSAGE_CLEAR:
      return {};

    default:
      return state;
  }
};
export const patientGetExerciseStatsReducer = (
  state = { state: {} },
  action
) => {
  switch (action.type) {
    case PATIENT_EXERCISE_STATS_REQUEST:
      return {
        loading: true,
      };
    case PATIENT_EXERCISE_STATS_SUCCESS:
      return {
        completeExerciseDetails: action.payload,
        loading: false,
      };
    case PATIENT_EXERCISE_STATS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PATIENT_EXERCISE_STATS_CLEAR:
      return {};

    default:
      return state;
  }
};
export const patientRegisterBasicDetailsReducer = (
  state = { state: {} },
  action
) => {
  switch (action.type) {
    case PATIENT_REGISTER_BASIC_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case PATIENT_REGISTER_BASIC_DETAILS_SUCCESS:
      return {
        basicDetails: action.payload,
        loading: false,
      };
    case PATIENT_REGISTER_BASIC_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PATIENT_REGISTER_BASIC_DETAILS_CLEAR:
      return {};

    default:
      return state;
  }
};
