import React from "react";
import './Login.css';
import user from "./assets/Images/person.png"
import emailicon from './assets/Images/email.png'
import passicon from './assets/Images/password.png'


function Login()
{
    return(<>
    <div className="container">
        <div className="header">
            <div className="text">Signup</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <img src={user} alt="" />
                <input type="text" name="" id="" placeholder="Name" />
              </div>  
              <dvi className="input">
                <img src={user} alt="" />
                <input type="text" name="" id="" placeholder="Username"/>
              </dvi>
              <div className="input">
                <img src={emailicon} alt="" />
                <input type="email" name="" id="" placeholder="Email"/>
              </div>
              <div className="input">
                <img src={passicon} alt="" />
                <input type="password" name="" id="" placeholder="Password"/>
              
            </div>
        </div>
        <div className="submit-container">
            <div className="submit">Sign up</div>
            <div className="submit">Login</div>
        </div>
    </div>
    </>);
}

export default Login