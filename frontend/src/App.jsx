import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import View from "./pages/View.jsx";
import Add from "./pages/Add.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";


function App() {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <View /> //= userData.role === "admin"
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        />
        <Route
          path="/add"
          element={
            isAdmin ? (
              <Add />
            ) : (
              <h1>Only admin can access this page</h1>
            )
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
