import React from 'react';
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
import DoctorAddExerciseScreen from './screens/DoctorAddExerciseScreen.js';
import DoctorReadPatientMessagesScreen from './screens/DoctorReadPatientMessagesScreen.js';
import DoctorCheckPatientHistoryScreen from './screens/DoctorCheckPatientHistoryScreen.js';
import DoctorAddPersonalDetailsScreen from './screens/DoctorAddPersonalDetailsScreen.js';
import ExerciseHandlerScreenTypeOne from './screens/ExerciseHandlerScreenTypeOne';
import ExerciseHandlerScreenTypeTwo from './screens/ExerciseHandlerScreenTypeTwo';

import ProtectedRoute from './components/ProtectedRoute';

import './App.css';
const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Route path='/login' component={LoginScreen} />
        <Route path='/registration' component={RegistrationScreen} exact />
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
        <Route
          path='/doctor-add-exercise'
          component={DoctorAddExerciseScreen}
          exact
        />
        {/* <ProtectedRoute
          path='/doctor-add-exercise'
          component={DoctorAddExerciseScreen}
          role='doctor'
          exact
        /> */}
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
          path='/doctor-add-personal-details'
          component={DoctorAddPersonalDetailsScreen}
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
