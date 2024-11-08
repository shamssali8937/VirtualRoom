import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSettingsOutline } from "react-icons/io5";
import Navbar1 from "../components/Navbar1";
import { LuHome } from "react-icons/lu";
import { PiStudentBold } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import "../Css/Landpage1.css";

function Landpage1(){

    let [click,setclick]=useState(false);
    let handleclick=()=>{
        setclick(!click);
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
            <div className={`joinclass ${click?'opacity1':'opacity0'}`}>
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
        </div>
        </>
         
    )
    
    
}

export default Landpage1;