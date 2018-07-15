import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Room from "./Room";
import NotFound from "./NotFound";
import { createStore } from "redux";
import reducer from "./reducers";
import {Provider} from "react-redux";

let store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        </p>
            <BrowserRouter>
            <Switch>
            <Route exact path="/" component={Room} />
            <Route component={NotFound} />
            </Switch>
            </BrowserRouter>
      </div>
      </Provider>
    );
  }
}

export default App;
