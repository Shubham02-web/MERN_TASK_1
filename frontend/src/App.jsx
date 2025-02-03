import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import Profile from "./components/Profile";
import UpdateUser from "./components/UpdateUser";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update" element={<UpdateUser />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
