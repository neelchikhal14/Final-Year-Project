import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
    </Router>
  );
};

export default App;
