import { Link, useNavigate } from 'react-router-dom';
import "../Css/Login1.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri"


function Login1()
{
    return (
        <>
        <div className="wraper">
            <form action="">
                <h1 className='head'>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder='Email' required/>
                    <MdEmail className='icon'/>
                    </div> 
                    <div className="input-box">
                    <input type="password" placeholder='Password' required/>
                    <RiLockPasswordFill className='icon'/>
                    </div> 
                    <div className="rember-forget">
                    <label htmlFor=""><input type="checkbox" />Show Password</label>
                    <a href="a">Forget password?</a>
                    </div>
                    <button type='submit'>Login</button>

                    <div className="register-link">
                        <p>Dont't have an account? <a href="a">Sign Up</a></p>
                    </div>
            </form>
        </div>
        </>
    )
}

export default Login1;