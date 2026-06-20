import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import SigninPage from './pages/auth/signinPage';
import SignupPage from './pages/auth/signupPage';
import Ethos from './pages/home/base';
import ApiProvider from './context/apiProvider';
import { CookieConsentProvider } from "./features/cookie-consent/CookieConsentProvider";
import { AppShell } from './AppShell';



function App() {

  return (
    <>
    
      <ApiProvider>
       <CookieConsentProvider>
        <AppShell />

        {/* <CookieConsentModal /> */}

        <Routes>
          <Route path="/v1" element={ <Ethos />} />

          <Route path="/ethos" element={ <Ethos />} />
          <Route path="/hunt" element={
            <SigninPage />
          } />
          <Route path="/join" element={
            <SignupPage />
          } />
        </Routes>

        </CookieConsentProvider>
      </ApiProvider>
                
       
    </>
  )
}


export default App
