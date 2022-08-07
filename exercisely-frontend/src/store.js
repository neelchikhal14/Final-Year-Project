import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer';
import {
  patientGetExercisesReducer,
  patientSelectExercisesReducer,
  patientUpdateSessionStatsReducer,
  patientSendMessageReducer,
  patientGetExerciseStatsReducer,
  patientRegisterBasicDetailsReducer,
} from './reducers/patientReducer';
import {
  doctorFetchPatientReducer,
  doctorGetExercisesReducer,
  doctorSetExerciseReducer,
  doctorCheckMedicalRecordReducer,
  doctorCreateMedicalRecordReducer,
  doctorRetrieveMessagesReducer,
  doctorGetPatientHistoryReducer,
  doctorRegisterPersonalDetailsReducer,
  doctorGetMultiplePatientsReducer,
} from './reducers/doctorReducer';
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  patientAssignedExercises: patientGetExercisesReducer,
  patientSelectExercises: patientSelectExercisesReducer,
  patientUpdateSessionStats: patientUpdateSessionStatsReducer,
  patientSendMessage: patientSendMessageReducer,
  patientGetExerciseStats: patientGetExerciseStatsReducer,
  patientRegisterBasicDetail: patientRegisterBasicDetailsReducer,
  doctorFetchPatient: doctorFetchPatientReducer,
  doctorGetExercises: doctorGetExercisesReducer,
  doctorSetExercise: doctorSetExerciseReducer,
  doctorCheckMedicalRecord: doctorCheckMedicalRecordReducer,
  doctorCreateMedicalRecord: doctorCreateMedicalRecordReducer,
  doctorRetrieveMessages: doctorRetrieveMessagesReducer,
  doctorGetPatientHistory: doctorGetPatientHistoryReducer,
  doctorRegisterPersonalDetails: doctorRegisterPersonalDetailsReducer,
  doctorGetMultiplePatients: doctorGetMultiplePatientsReducer,
});

const initialState = {
  userLogin: {},
  userRegister: {},
  patientAssignedExercises: {},
  patientSelectExercises: {},
  patientUpdateSessionStats: {},
  patientSendMessage: {},
  patientGetExerciseStats: {},
  patientRegisterBasicDetail: {},
  doctorFetchPatient: {},
  doctorGetExercises: {},
  doctorSetExercise: {},
  doctorCheckMedicalRecord: {},
  doctorCreateMedicalRecord: {},
  doctorRetrieveMessages: {},
  doctorGetPatientHistory: {},
  doctorRegisterPersonalDetails: {},
  doctorGetMultiplePatients: {},
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
