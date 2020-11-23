import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Firebase, { FirebaseContext } from "./components/Firebase";

function App() {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <div className="App"></div>
    </FirebaseContext.Provider>
  );
}

export default App;
