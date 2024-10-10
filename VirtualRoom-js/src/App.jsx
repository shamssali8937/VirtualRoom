import { Routes, Route ,Navigate} from "react-router-dom";
import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import Landpage from './Pages/Landpage.jsx'

function App() {
 

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


