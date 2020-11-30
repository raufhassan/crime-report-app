import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import SignUp from "../features/SignUp";
import Login from "../features/SignIn";
import Home from "../features/Dashboard";
import { AuthProvider } from "../providers/AuthProvider";
import ForgotPassword from "../features/ForgotPassword";
import Navbar from "./Navbar";
import AddReport from "../features/AddReport";
const MainComponent = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute exact path="/add-report" component={AddReport} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default MainComponent;
