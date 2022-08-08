import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import PatientDashboardScreen from './screens/PatientDashboardScreen';
import PatientStatsScreen from './screens/PatientStatsScreen';
import PatientSendMessageScreen from './screens/PatientSendMessageScreen';
import PatientAddDetailsScreen from './screens/PatientAddDetailsScreen';
import DoctorDashboardScreen from './screens/DoctorDashboardScreen';
import DoctorAddExerciseScreen from './screens/DoctorAddExerciseScreen';
import DoctorReadPatientMessagesScreen from './screens/DoctorReadPatientMessagesScreen';
import DoctorCheckPatientHistoryScreen from './screens/DoctorCheckPatientHistoryScreen';
import DoctorAddPersonalDetailsScreen from './screens/DoctorAddPersonalDetailsScreen';
import DoctorUpdatePatientExerciseScreen from './screens/DoctorUpdatePatientExerciseScreen';
import DoctorDeletePatientExerciseScreen from './screens/DoctorDeletePatientExerciseScreen';
import ExerciseHandlerScreenTypeOne from './screens/ExerciseHandlerScreenTypeOne';
import ExerciseHandlerScreenTypeTwo from './screens/ExerciseHandlerScreenTypeTwo';

import ProtectedRoute from './components/ProtectedRoute';

import Information from './components/Information';

import './App.css';
let timer;

const App = () => {
  const [displayAlert, setDisplayAlert] = useState(false);
  const [logoutTriggered, setLogoutTriggered] = useState(false);
  useEffect(() => {
    timer = setInterval(() => {
      if (sessionStorage.getItem('expiresAt')) {
        const expiry = Number(sessionStorage.getItem('expiresAt'));
        const expiryMinusOneMin = expiry - 1 * 60 * 1000;
        console.log('expiry', new Date(expiry));

        console.log('expiry-1', new Date(expiryMinusOneMin));
        if (Number(new Date().getTime()) >= expiryMinusOneMin) {
          console.log('time matched', new Date());
          setDisplayAlert(true);
          clearInterval(timer);
        }
      }
    }, 1000);
  }, [displayAlert]);

  useEffect(() => {
    if (!logoutTriggered) {
      clearInterval(timer);
    }
  }, [logoutTriggered]);

  return (
    <Router>
      <Header setLogoutTriggered={setLogoutTriggered} />
      <main className='py-3'>
        <Route path='/login' component={LoginScreen} />
        <Route path='/registration' component={RegistrationScreen} exact />
        {displayAlert && (
          <div className='session-alert'>
            <Information>
              <h3>Timer will expire in 1 minute</h3>
            </Information>
          </div>
        )}
        {/* <Route
          path='/patient-dashboard'
          component={PatientDashboardScreen}
          exact
        /> */}
        <ProtectedRoute
          path='/patient-dashboard'
          component={PatientDashboardScreen}
          role='patient'
          exact
        />
        <ProtectedRoute
          path='/patient/start-exercise-type-one'
          component={ExerciseHandlerScreenTypeOne}
          role='patient'
          exact
        />
        <ProtectedRoute
          path='/patient/start-exercise-type-two'
          component={ExerciseHandlerScreenTypeTwo}
          role='patient'
          exact
        />
        <ProtectedRoute
          path='/patient/view-staticstics'
          component={PatientStatsScreen}
          role='patient'
          exact
        />
        {/* <Route
          path='/patient/view-staticstics'
          component={PatientStatsScreen}
          exact
        /> */}
        <ProtectedRoute
          path='/patient/send-message'
          component={PatientSendMessageScreen}
          role='patient'
          exact
        />
        <ProtectedRoute
          path='/patient/add-details'
          component={PatientAddDetailsScreen}
          role='patient'
          exact
        />
        <ProtectedRoute
          path='/doctor-dashboard'
          component={DoctorDashboardScreen}
          role='doctor'
          exact
        />
        {/* <Route
          path='/doctor-add-exercise'
          component={DoctorAddExerciseScreen}
          exact
        /> */}
        <ProtectedRoute
          path='/doctor-add-exercise'
          component={DoctorAddExerciseScreen}
          role='doctor'
          exact
        />
        <ProtectedRoute
          path='/doctor-read-patient-messages'
          component={DoctorReadPatientMessagesScreen}
          role='doctor'
          exact
        />
        <ProtectedRoute
          path='/doctor-check-patient-history'
          component={DoctorCheckPatientHistoryScreen}
          role='doctor'
          exact
        />
        <ProtectedRoute
          path='/doctor-delete-patient-exercise'
          component={DoctorDeletePatientExerciseScreen}
          role='doctor'
          exact
        />
        <ProtectedRoute
          path='/doctor-add-personal-details'
          component={DoctorAddPersonalDetailsScreen}
          role='doctor'
          exact
        />

        <ProtectedRoute
          path='/doctor-update-patient-exercise'
          component={DoctorUpdatePatientExerciseScreen}
          role='doctor'
          exact
        />

        <Route path='/' component={HomeScreen} exact />
      </main>
      <Footer />
    </Router>
  );
};
// const App = () => {
//   return (
//     <Router>
//       <Header />
//       <main className='py-3'>
//         <Route path='/login' component={LoginScreen} />
//         <Route path='/registration' component={RegistrationScreen} exact />
//         <Route
//           path='/patient-dashboard'
//           component={PatientDashboardScreen}
//           exact
//         />
//         {/* <ProtectedRoute
//           path='/patient-dashboard'
//           component={PatientDashboardScreen}
//           auth={true}
//         /> */}
//         <Route
//           path='/patient/start-exercise-type-one'
//           component={ExerciseHandlerScreenTypeOne}
//           exact
//         />
//         <Route
//           path='/patient/start-exercise-type-two'
//           component={ExerciseHandlerScreenTypeTwo}
//           exact
//         />
//         <Route
//           path='/patient/view-staticstics'
//           component={PatientStatsScreen}
//           exact
//         />
//         <Route
//           path='/patient/send-message'
//           component={PatientSendMessageScreen}
//           exact
//         />
//         <Route
//           path='/patient/add-details'
//           component={PatientAddDetailsScreen}
//           exact
//         />
//         <Route
//           path='/doctor-dashboard'
//           component={DoctorDashboardScreen}
//           exact
//         />
//         <Route
//           path='/doctor-add-exercise'
//           component={DoctorAddExerciseScreen}
//           exact
//         />
//         <Route
//           path='/doctor-read-patient-messages'
//           component={DoctorReadPatientMessagesScreen}
//           exact
//         />
//         <Route
//           path='/doctor-check-patient-history'
//           component={DoctorCheckPatientHistoryScreen}
//           exact
//         />
//         <Route
//           path='/doctor-add-personal-details'
//           component={DoctorAddPersonalDetailsScreen}
//           exact
//         />

//         <Route path='/' component={HomeScreen} exact />
//       </main>
//       <Footer />
//     </Router>
//   );
// };

export default App;
