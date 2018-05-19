import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PatientTests from './components/PatientTests'
class App extends Component {
  render() {
    return (
      <div>
      
      <h1> Pacientes</h1>
      <div className="header-bar">
      	<PatientTests/>
      </div>
      </div>
    );
  }
}

export default App;
