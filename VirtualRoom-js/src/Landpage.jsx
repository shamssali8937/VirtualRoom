import React from "react";
import { useState } from "react";
import './Landpage.css'
import usericon from './assets/Images/person.png'

function Landpage()
{
    const [click,setclick]=useState(true);

    const [data,setData]=useState({
        name:"shams",
        username:"aliveshams",
        email:"shams@gmail.com"
    });

    const handleclickaccount=()=>{
         setclick(true);
    };
    const handleclickpasswd=()=>{
        setclick(false);
   };

    return(
    <>
   
    { <nav className="navbar"> 
        <div className="navdiv">
            <div className="logo"><a href="">Virtual Room</a></div>
            <ul>
                <li><a href="#con-body">Home</a></li>
                <li><a href="">About Us</a></li>
                <li><a href="">Contact Us</a></li>
            </ul>
        </div>
    </nav> }
    <h1>User Account</h1>
    <div className="body-container" id="con-body">
    
        <div className="side-bar">
            <div className="image">
                    <img src={usericon} alt="user" />                    
            </div>
            <div className="name">
            {data.username}
            </div>
            <div className="account-information" onClick={handleclickaccount}>
                Account
            </div>
            <div className="account-information" onClick={handleclickpasswd}>
                Password
            </div>
        </div>
        <div className="main-content red-background">
            {
                click?(
              <div className="data display">
                <label htmlFor="name">Name</label><input type="text" value={data.name} name="name" readOnly />
                <label htmlFor="username">Username</label><input type="text" value={data.username} name="username" readOnly />
                <label htmlFor="email">Email</label><input type="email" value={data.email} name="email" readOnly />
              </div>

                ):(
              <div className="password opacity">
              <label htmlFor="password">Password</label><input type="text" value={data.email} name="password" readOnly />
              </div>
                )}
        </div>
    </div>


    </>);
}

export default Landpage;