import React, { Component } from 'react';
import './App.css';
import MnemonicGenerator from './components/MnemoninGenerator/MnemonicGenerator';

class App extends Component {
  render() {
    return (
      <div className="App">
      <MnemonicGenerator pubKey="holamundo"/>        
      </div>
    );
  }
}

export default App;
