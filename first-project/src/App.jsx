import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

function App() {

  return (
    <div>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
