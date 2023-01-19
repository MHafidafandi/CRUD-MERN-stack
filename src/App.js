import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Singup";
import Login from "./components/Login";
import { Pages } from "./components/Main/pages/pages";
import { Add } from "./components/add/Add";
import { Update } from "./components/update/update";

function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      {user && <Route path="/" exact element={<Pages />} />}
      <Route path="/add" exact element={<Add />} />
      <Route path="/update/:id" exact element={<Update />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" exact element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
