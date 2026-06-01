import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from './pages/auth/loginPage';
import Config from './config'
import Ethos from './pages/home/base';

const baseUrl = Config.baseURL

function App() {
  return (
    <>

      <Routes>
        <Route path="/ethos" element={ <Ethos />} />
        <Route path="/login" element={
          <LoginPage />
        } />
      </Routes>
                
       
    </>
  )
}


export default App
