import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
// import store from './store.tsx'
import ApiProvider from './context/apiProvider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ApiProvider>

         {/* <Provider store={store}> */}
        {/* <Provider > */}

        <App />
        {/* </Provider> */}
      </ApiProvider>
       
    </BrowserRouter>
  </StrictMode>
)