import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import SignUp from "./features/signUp";
import Login from "./features/signIn";
import Home from "./features/home";
import { AuthProvider } from "./providers/AuthProvider";
import ForgotPassword from "./features/forgotPwd";
import Navbar from "./components/Navbar";
import Complain from "./features/complain";
import MainComponent from "./components/MainComponent";

function App() {
  return <MainComponent />;
}

export default App;
