import React from "react";
import "./App.css";
import Home from "./Components/Home";
import Appointment from "./Components/Appointment/Appointment";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddAppointment from "./Components/AddAppointment/AddAppointment";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/addAppointment">
            <AddAppointment></AddAppointment>
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
