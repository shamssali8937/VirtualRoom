import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import './Signup.css';
import emailicon from './assets/Images/email.png'
import passicon from './assets/Images/password.png'


function Login()
{
    const navigate=useNavigate();
     const [data,setData]=useState({
        email:"",
        password:""
     });
    const clear=()=>{
        setData({
        email:"",
        password:""
        })
    };
    const handlesubmit=(event)=>{
        event.preventDefault();
        if(data.email=="shams@gmail.com"&&data.password=="shams")
        {
            navigate("/Landpage");
        }
        else
        {
            alert("invalid credentials");
            clear();
        }

    };

    const handlechange = (event) => {
        const name = event.target.name;
        const value=event.target.value;
        setData(prevdata => ({
            ...prevdata,
            [name]: value
        }));
    };


    return(
    <>
    <div className="container">
        <div className="header">
            <div className="text">Login</div>
             <div className="underline"></div>
        </div>     
        <form onSubmit={handlesubmit} className="inputs">               
                <div className="input">
                <img src={emailicon} alt="email" />
                <input type="email" placeholder="Email" name="email" value={data.email} onChange={handlechange} required/>
                </div>
                <div className="input">
                <img src={passicon} alt="passwd" />
                <input type="password" placeholder="Password" name="password" value={data.password} onChange={handlechange} required/>
                </div>
                <div className="link">
                    <a href="" target="blank" id="link">Forgot Password</a>
                </div>
                <div className="link">
                    <Link to="/signup" id="link">Register?</Link>
                </div>
                <div className="submit-container">
                    <button  className="submit" type="submit">Login</button>
                </div>
            </form>
    </div>

    </>);
}

export default Login;