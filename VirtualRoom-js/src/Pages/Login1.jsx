import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import "../Css/Login1.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri"


function Login1()
{
    let navigate=useNavigate();
    const [showpassword, setshowpassword] = useState(false);
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
            axios.post("https://localhost:7124/api/Virtual/Login",credentials)
            .then((response)=>{
                if(response.data.statuscode==200)
                {
                    const token=response.data.statusmessage;
                    localStorage.setItem('token',token);
                    if(token)
                    {
                        console.log(token);
                       axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
                       navigate("/landpage1");
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

    const toggleshowpassword = () => {
        setshowpassword(!showpassword);
    };

    return (
        <>
        <div className="wraper">
            <form onSubmit={handlesubmit}>
                <h1 className='head'>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder='Email' name='email' id='email' value={data.email} onChange={handlechange} required/>
                    <MdEmail className='icon'/>
                    </div> 
                    <div className="input-box">
                    <input type={showpassword ? "text" : "password"} placeholder='Password' id='password' name="password" value={data.password} onChange={handlechange} required/>
                    <RiLockPasswordFill className='icon'/>
                    </div> 
                    <div className="rember-forget">
                    <label htmlFor='showpass'><input type="checkbox" name='showpass' id='showpass' onChange={toggleshowpassword} />Show Password</label>
                     <Link to="/signup1" id="link">Forget password?</Link> 
                    </div>
                    <button type='submit'>Login</button>

                    <div className="register-link">
                        <p>Dont't have an account? <Link to="/signup1" id="link">Sign Up?</Link> </p>
                    </div>
            </form>
        </div>
        </>
    )
}

export default Login1;