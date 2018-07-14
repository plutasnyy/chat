import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Room from "./Room";
import NotFound from "./NotFound";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
            <BrowserRouter>
            <Switch>
            <Route exact path="/" component={Room} />
            <Route component={NotFound} />
            </Switch>
            </BrowserRouter>
      </div>
    );
  }
}

export default App;
