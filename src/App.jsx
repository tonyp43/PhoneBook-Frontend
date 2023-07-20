import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/Register' element={<Register />}></Route>
        <Route path='/Login' element={<Login />}></Route>
      </Routes>
      <ToastContainer position="top-right" />
    </BrowserRouter>
  )
}

export default App
