import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import PatientDashboardScreen from './screens/PatientDashboardScreen';
import DoctorDashboardScreen from './screens/DoctorDashboardScreen';
import ExerciseScreenTypeOne from './screens/ExerciseScreenTypeOne';
import ExerciseScreenTypeTwo from './screens/ExerciseScreenTypeTwo';
import PatientStatsScreen from './screens/PatientStatsScreen';
import PatientSendMessageScreen from './screens/PatientSendMessageScreen';

import './App.css';
const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Route path='/login' component={LoginScreen} />
        <Route path='/registration' component={RegistrationScreen} exact />
        <Route
          path='/patient-dashboard'
          component={PatientDashboardScreen}
          exact
        />
        <Route
          path='/patient/start-exercise-type-one'
          component={ExerciseScreenTypeOne}
          exact
        />
        <Route
          path='/patient/start-exercise-type-two'
          component={ExerciseScreenTypeTwo}
          exact
        />
        <Route
          path='/patient/view-staticstics'
          component={PatientStatsScreen}
          exact
        />
        <Route
          path='/patient/send-message'
          component={PatientSendMessageScreen}
          exact
        />
        <Route
          path='/doctor-dashboard'
          component={DoctorDashboardScreen}
          exact
        />
        <Route path='/' component={HomeScreen} exact />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
