import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import View from "./pages/View.jsx";
import Add from "./pages/Add.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("isLoggedIn") ? (
              <View isAdmin={localStorage.getItem("isAdmin")} /> //= userData.role === "admin"
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        />
        <Route
          path="/add"
          element={
            localStorage.getItem("isAdmin") ? (
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
