import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import '../Css/signup.css';
import emailicon from '../assets/Images/email.png'
import passicon from '../assets/Images/password.png'
import axios from 'axios';


function Login()
{
    let navigate=useNavigate();
    let [data,setData]=useState({
        email:"",
        password:""
     });
    let clear=()=>{
        setData({
        email:"",
        password:""
        })
    };

    let handlesubmit=(event)=>{
        event.preventDefault();
        if(data.email!=null&&data.password!=null)
        {
            const credentials={
                email:data.email,
                password:data.password
            }
            axios.post("https://localhost:7040/api/StudentPortal/Login",credentials)
            .then((response)=>{
                if(response.data.statuscode==200)
                {
                    const token=response.data.statusmessage;
                    localStorage.setItem('token',token);
                    if(token)
                    {
                       axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
                       navigate("/landpage");
                    }
                    else{
                        alert("Token is not valid");
                        clear();
                      }
                }
                else
                {
                    alert("invalid credentials");
                    clear();
                }
            });
            
        }
        else
        {
            alert("Please enter credentials");
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
                    <a href="" target="blank" id="link" className='link'>Forgot Password</a>
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