import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
 import './index.css'
import Tag from './Tag.jsx'
// import Login from './Login.jsx'
import Signup from './Signup.jsx'
import Login from './Login2.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <>
         <Router>
             <App />
         </Router>
    
      {/* <Tag /> */}
      {/* <Login /> */}
      {/* <Signup /> */}
      {/* <Login /> */}
  </>
    
    
  </StrictMode>,
 
)






