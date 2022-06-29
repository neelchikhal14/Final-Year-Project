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
} from '../constants/patientConstants';

export const patientGetExercisesReducer = (state = { state: {} }, action) => {
  switch (action.type) {
    case PATIENT_EXERCISE_REQUEST:
      return {
        loading: true,
      };
    case PATIENT_EXERCISE_SUCCESS:
      return {
        loading: false,
        ...state,
        assignedExercises: action.payload,
      };
    case PATIENT_PENDING_EXERCISES_REQUEST:
      return {
        loading: false,
        ...state,
        assignedExercisesDetailed: action.payload,
      };

    case PATIENT_EXERCISE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

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

    default:
      return state;
  }
};
