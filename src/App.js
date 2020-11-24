import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Firebase, { FirebaseContext } from "./components/Firebase";
import SignUp from "./routes/signUp";
import Login from "./routes/signIn";
import Home from "./routes/home";
import { AuthProvider } from "./components/Provider";
import ForgotPassword from "./routes/forgotPwd";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
