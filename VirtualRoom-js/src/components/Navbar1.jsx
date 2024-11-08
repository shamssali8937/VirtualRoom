import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Navbar.css';
import { SiGoogleclassroom } from "react-icons/si";
import { FaRegCircleUser } from "react-icons/fa6";
function Navbar1()
{
    let [click1,setclick1]=useState(false);
    let handleclick1=()=>{
        setclick1(!click1);
   };
   let [click2,setclick2]=useState(false);
   let handleclick2=()=>{
       setclick2(!click2);
  };
    return(
        <>
        <div className="navbar">
            <div className="left">
            <SiGoogleclassroom className='icon-main'/><h1>VirtualRoom</h1>
            </div>
            <div className="right">
                <button className="nav-btn" onClick={handleclick2}>Join Class</button>
                <button className="nav-btn">Create Class</button>
                <FaRegCircleUser className='icons' onClick={handleclick1}/>
            </div>
        </div>
        <div className={`user ${click1?'opacity1':'opacity0'}`}>
            <label>Shams@gmail.com</label>
            <FaRegCircleUser className='icons profile'/>
            <label>Shams Ali Mehdi</label>
            <div className="signout">
            <Link to="/login1" id="link">Sign Out</Link> 
            </div>
        </div>
        <div className={`joinclass ${click2?'opacity1':'opacity0'}`}>
                <h3>Join Class</h3>
                <div className="class">
                    <h4>Class Name</h4>
                    <p>Ask your teacher for the class name, then enter it here.</p>
                    <input type="text" name="class" required />
                </div>
                <div className="instruction">
                <p>To sign in with a class Name</p>
                <ul>
                    <li>Use an authorised account</li>
                    <li>Use a class name with 5-7 letters or numbers, and no spaces or symbols</li>
                </ul>
                </div>
                <div className="button">
                   <button>Cancel</button>
                   <button>Join</button>
                </div>
            </div>
        
        </>
    )
}

export default Navbar1;
