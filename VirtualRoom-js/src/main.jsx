import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Tag from './Tag.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <>
      <App />
      <Tag />
  </>
    
    
  </StrictMode>,
 
)






