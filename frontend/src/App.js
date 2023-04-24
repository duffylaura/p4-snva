
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Login from './components/login';
import Register from "./components/register";
import welcomeUser from './components/welcomeUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcomeUser" element={< welcomeUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
