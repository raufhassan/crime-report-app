import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import SignUp from "../features/signUp";
import Login from "../features/signIn";
import Home from "../features/home";
import { AuthProvider } from "../providers/AuthProvider";
import ForgotPassword from "../features/forgotPwd";
import Navbar from "./Navbar";
import Complain from "../features/complain";
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
          <PrivateRoute exact path="/complain" component={Complain} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default MainComponent;
