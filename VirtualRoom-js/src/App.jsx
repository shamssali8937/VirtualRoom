import { Routes, Route ,Navigate} from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import Signup from './Pages/Signup.jsx';
// import Login from './Pages/Login.jsx';
import Landpage from './Pages/Landpage.jsx'
import Login1 from "./Pages/Login1.jsx";
import Signup1 from "./Pages/Signup1.jsx";

function App() {

  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/landpage') {
      document.body.classList.add('background-image');
  } else {
      document.body.classList.remove('background-image');
  }
}, [location.pathname]);

  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to="/login1" />} />
        {/* <Route path='/signup' element={<Signup />}/> */}
        <Route path='/signup1' element={<Signup1 />}/>
        <Route path='/login1' element={<Login1 />}/>
        {/* <Route path='/login' element={<Login />}/> */}
        <Route path='/landpage' element={<Landpage />}/>
      </Routes>
    </>
  )
}



export default App


