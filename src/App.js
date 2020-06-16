import React from "react";
import "./App.css";
import Home from "./Components/Home";
import Appointment from "./Components/Appointment/Appointment";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/Dashboard">
            <Dashboard></Dashboard>
          </Route>
          <Route path="/Appointment">
            <Appointment></Appointment>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
