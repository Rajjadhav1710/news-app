import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <>
        <NavBar/>
        <News pageSize={8} country="in" category="science"/>
      </>
    );
  }
}

