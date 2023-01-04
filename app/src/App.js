import Start from "./pages/Start"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Lobby from "./pages/Lobby"
import Register from "./pages/Register"
import Game from "./pages/Game"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameStart from "./pages/GameStart"
import React, { useState ,useEffect } from 'react'



function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Start />}/>
        <Route path="/home" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/lobby" element={<Lobby/>} />
        <Route path="/gameStart" element={<GameStart />} />
        <Route path="/game" element={<Game />} />
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
