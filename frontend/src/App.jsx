import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LogIn } from "./pages/LogIn";
import { Register } from "./pages/Register";
import Notes from "./pages/Notes";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/login" element={<LogIn></LogIn>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;
