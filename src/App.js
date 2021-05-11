import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer';
import Root from './components/Root';

class App extends Component {
  render() {
    return (<React.Fragment>
      <Root/>
      <Footer/>
    </React.Fragment>)
  }
}

export default App;
