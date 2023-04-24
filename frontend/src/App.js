
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Login from './components/login';
import Register from "./components/register";
import WelcomeUser from './components/welcomeUser';
import Wildcard from './components/wildcard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcomeUser" element={< WelcomeUser />} />
        <Route path="*" element={<Wildcard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
