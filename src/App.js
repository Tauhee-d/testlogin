import "./App.css";
import Signin from "./Screens/Signin&Signup/Signin";
import Signup from "./Screens/Signin&Signup/Signup";
import Home from "./Screens/Home";
import { Routes, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/Signin" element={<Signin />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  );
}

export default App;
