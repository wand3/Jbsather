import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import SigninPage from './pages/auth/signinPage';
import SignupPage from './pages/auth/signupPage';
import Config from './config'
import Ethos from './pages/home/base';
import ApiProvider from './context/apiProvider';

const baseUrl = Config.baseURL


function App() {
  return (
    <>
      <ApiProvider>

      
        <Routes>
          
          <Route path="/ethos" element={ <Ethos />} />
          <Route path="/hunt" element={
            <SigninPage />
          } />
          <Route path="/join" element={
            <SignupPage />
          } />
        </Routes>
      </ApiProvider>
                
       
    </>
  )
}


export default App
