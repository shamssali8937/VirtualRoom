import '../Css/Navbar.css';
import { SiGoogleclassroom } from "react-icons/si";
import { FaRegCircleUser } from "react-icons/fa6";
function Navbar1()
{
    return(
        <>
        <div className="navbar">
            <div className="left">
            <SiGoogleclassroom className='icon-main'/><h1>VirtualRoom</h1>
            </div>
            <div className="right">
                <button className="nav-btn">Join Class</button>
                <button className="nav-btn">Create Class</button>
                <FaRegCircleUser className='icons'/>
            </div>
        </div>
        </>
    )
}

export default Navbar1;
