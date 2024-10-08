import React from "react";
import './Landpage.css'
import usericon from './assets/Images/person.png'

function Landpage()
{
    return(
    <>
   
    <nav className="navbar"> 
        <div className="navdiv">
            <div className="logo"><a href="">Virtual Room</a></div>
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="">About Us</a></li>
                <li><a href="">Contact Us</a></li>
            </ul>
        </div>
    </nav>
    <div className="body-container">
        <div className="side-bar">
            <h1>User Account</h1>
            <div className="box">
                <div className="imgae">
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    </div>

    </>);
}

export default Landpage;