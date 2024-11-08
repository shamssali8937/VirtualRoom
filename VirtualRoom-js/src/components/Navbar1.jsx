import { useState } from 'react';
import '../Css/Navbar.css';
import { SiGoogleclassroom } from "react-icons/si";
import { FaRegCircleUser } from "react-icons/fa6";
function Navbar1()
{
    let [click,setclick]=useState(false);
    let handleclick=()=>{
        setclick(!click);
   };
    return(
        <>
        <div className="navbar">
            <div className="left">
            <SiGoogleclassroom className='icon-main'/><h1>VirtualRoom</h1>
            </div>
            <div className="right">
                <button className="nav-btn">Join Class</button>
                <button className="nav-btn">Create Class</button>
                <FaRegCircleUser className='icons' onClick={handleclick}/>
            </div>
        </div>
        <div className={`user ${click?'opacity1':'opacity0'}`}>
            <label>Shams@gmail.com</label>
            <FaRegCircleUser className='icons profile'/>
            <label>Shams Ali Mehdi</label>
            <div className="signout">
            <a href="#">Sign out</a>
            </div>
        </div>
        </>
    )
}

export default Navbar1;
