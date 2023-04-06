import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Player from './pages/Player';
import KarsanthFlix from './pages/KarsanthFlix';
import Movies from './pages/Movies';
import Mylist from './pages/Mylist';
export default function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/" element={<KarsanthFlix/>} />
        <Route exact path='/player' element={<Player/>}/>
        <Route exact path='/movies' element={<Movies/>}/>
        <Route exact path='/mylist' element={<Mylist/>}/>
    </Routes>
    </BrowserRouter>
  );
}
