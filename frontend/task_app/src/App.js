import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import {TodosProvider} from "./context/TodosProvider";


function App() {
  return (
      <TodosProvider>
          <Routes>
              <Route path="/"  element={<Login/>} />
              <Route path="/register"  element={<Register/>} />
              <Route path="/home"  element={<Home/>} />
          </Routes>
      </TodosProvider>
  );
}

export default App;
