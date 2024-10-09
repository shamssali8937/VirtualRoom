import React from "react";
import { useState } from "react";
import './Landpage.css'
import usericon from './assets/Images/person.png'

function Landpage()
{
    const [click,setclick]=useState(false);

    const [data,setData]=useState({
        name:"shams",
        username:"aliveshams",
        email:"shams@gmail.com"
    });

    const hanleclick=()=>{
         setclick(!click);
    };

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
    <h1>User Account</h1>
    <div className="body-container">
    
        <div className="side-bar">
            <div className="image">
                    <img src={usericon} alt="user" /> 
            </div>
            <div className="account-information" onClick={hanleclick}>
                Account
            </div>
            <div className="account-information">
                Password
            </div>
        </div>
        <div className="main-content red-background">
              <div className={`data ${click?"display":""}`}>
                <label htmlFor="name">Name</label><input type="text" value={data.name} name="name" readOnly />
                <label htmlFor="username">Username</label><input type="text" value={data.username} name="username" readOnly />
                <label htmlFor="email">Email</label><input type="email" value={data.email} name="email" readOnly />
              </div>
              <div className="password">
              <label htmlFor="password">Password</label><input type="text" value={data.email} name="password" readOnly />
              </div>
        </div>
    </div>


    </>);
}

export default Landpage;