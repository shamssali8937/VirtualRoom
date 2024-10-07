import { Routes, Route ,Navigate} from "react-router-dom";
import Signup from './Signup.jsx';
import Login from './Login2.jsx';
import Landpage from './Landpage.jsx'

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


