import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from '../nav/nav';
import Signup from '../signup/signup';
import Login from '../login/login';
import Home from '../home/home';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
