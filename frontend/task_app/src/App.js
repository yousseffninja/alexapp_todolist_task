import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import RequireAuth from './context/AuthContext'

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/"  element={<Login/>} />
          <Route path="/register"  element={<Register/>} />
          {/*<Route element={<RequireAuth />} >*/}
            <Route path="/home"  element={<Home/>} />
          {/*</Route>*/}
        </Routes>
      </Router>
  );
}

export default App;
