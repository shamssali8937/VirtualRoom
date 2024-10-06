import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
 import './index.css'
import Tag from './Tag.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <>
      {/* <App />
      <Tag /> */}
      {/* <Login /> */}
      <Signup />
  </>
    
    
  </StrictMode>,
 
)






