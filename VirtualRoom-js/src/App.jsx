import { useState } from 'react'
import { Routes, Route ,Navigate} from "react-router-dom";
// import './App.css'
import Signup from './Signup.jsx';
import Login from './Login2.jsx';
import Landpage from './Landpage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/Landpage' element={<Landpage />}/>
      </Routes>
    </>
  )
}



export default App


