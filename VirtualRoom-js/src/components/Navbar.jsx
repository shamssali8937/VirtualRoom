import { useState } from "react";
import '../Landpage.css'


function Navbar()
{
    return(
        <nav className="navbar"> 
        <div className="navdiv">
            <div className="logo"><a href="">Virtual Room</a></div>
            <ul>
                <li><a href="#con-body">Home</a></li>
                <li><a href="">About Us</a></li>
                <li><a href="">Contact Us</a></li>
            </ul>
        </div>
    </nav>
    )
}

export default Navbar