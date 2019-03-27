import React, { Component } from 'react';
// import './App.css';
import './theme_styles/css/theme.css';
import MnemonicGenerator from './components/MnemoninGenerator/MnemonicGenerator';
import Footer from './components/Footer/footer';
class App extends Component {
  render() {
    return (
      <div className="App">
        
        <MnemonicGenerator pubKey="holamundo" />
        <Footer />
      </div>
    );
  }
}

export default App;
