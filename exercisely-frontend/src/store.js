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

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  patientAssignedExercises: patientGetExercisesReducer,
  patientSelectExercises: patientSelectExercisesReducer,
  patientUpdateSessionStats: patientUpdateSessionStatsReducer,
  patientSendMessage: patientSendMessageReducer,
  patientGetExerciseStats: patientGetExerciseStatsReducer,
  patientRegisterBasicDetail: patientRegisterBasicDetailsReducer,
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
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
