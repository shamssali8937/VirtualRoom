import { Routes, Route ,Navigate} from "react-router-dom";
import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import Landpage from './Pages/Landpage.jsx'
import Login1 from "./Pages/Login1.jsx";

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to="/login1" />} />
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login1' element={<Login1 />}/>
        {/* <Route path='/login' element={<Login />}/> */}
        <Route path='/landpage' element={<Landpage />}/>
      </Routes>
    </>
  )
}



export default App


