import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSettingsOutline } from "react-icons/io5";
import Navbar1 from "../components/Navbar1";
import { LuHome } from "react-icons/lu";
import { PiStudentBold } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import "../Css/Landpage1.css";

function Landpage1(){

    let [click2,setclick2]=useState(false);
    let handleclick2=()=>{
        setclick2(!click2);
   };
   
    return(
        <>
        <Navbar1/>
        <div className="sidebar">
            <nav>
                <ul>
                <li><a href=""><LuHome className="side-icons"/>Home</a></li>
                </ul>
                <div className="underline">
                </div>
                <div className="section">
                    <ul>
                        <li><a href=""><PiStudentBold className="side-icons"/>Enrolled</a></li>
                    </ul>
                
                    <ul>
                    <li><a href=""><IoDocumentTextOutline className="side-icons"/>To Do</a></li>
                    </ul>
                </div>
                <div className="underline">
                </div>
                <ul id="setting">
                <li><a href="#"><IoSettingsOutline className="side-icons"/> Settings</a></li>
                </ul>
            </nav>
        </div>
        <div className="main-content">
     
        </div>
        </>
         
    )
    
    
}

export default Landpage1;