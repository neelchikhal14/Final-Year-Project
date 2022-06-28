import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer';
import {
  patientGetExercisesReducer,
  patientSelectExercisesReducer,
  patientUpdateSessionStatsReducer,
} from './reducers/patientReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  patientAssignedExercises: patientGetExercisesReducer,
  patientSelectExercises: patientSelectExercisesReducer,
  patientUpdateSessionStats: patientUpdateSessionStatsReducer,
});

const initialState = {
  userLogin: {},
  userRegister: {},
  patientAssignedExercises: {},
  patientSelectExercises: {},
  patientUpdateSessionStats: {},
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
