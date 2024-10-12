import { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import '../Css/Signup.css';
import user from "../assets/Images/person.png"
import emailicon from '../assets/Images/email.png'
import passicon from '../assets/Images/password.png'

function Signup()
{
    const [data,setData]=useState({
        email:"",
        password:"",
        name:"",
        username:""
    });
    
    const navigate=useNavigate(); 

    const handlesubmit=(event)=>{
        event.preventDefault();
        if(data.email&&data.password&&data.name&&data.username)
        {
            alert("Congragulation You Just Signed up Now Please Login");
            navigate("/login");
        }
    };
    const handlechange = (event) => {
        const { name, value } = event.target;
        setData(prevdata => ({
            ...prevdata,
            [name]: value
        }));
    };
    return(
    <>

    <div className="container">
        <div className="header">
            <div className="text">Signup</div>
             <div className="underline"></div>
        </div>     
            <form onSubmit={handlesubmit} className="inputs">
                <div className="input">
                <img src={user} alt="user" />
                <input type="text" placeholder="Name" name="name" value={data.name} onChange={handlechange} required/>
                </div>
                <div className="input">
                <img src={user} alt="user" />
                <input type="text" placeholder="Username" name="username" value={data.username} onChange={handlechange} required/>
                </div>
                <div className="input">
                <img src={emailicon} alt="email" />
                <input type="email" placeholder="Email" name="email" value={data.email} onChange={handlechange} required/>
                </div>
                <div className="input">
                <img src={passicon} alt="passwd" />
                <input type="password" placeholder="Password" name="password" value={data.password} onChange={handlechange} required/>
                </div>
                <div className="link">
                    {/* <a href="https://www.w3schools.com/react/react_forms.asp" target="blank">Already Have Account?</a> */}
                    <Link to="/login" id="link">Already Have Account?</Link>
                </div>
                <div className="submit-container">
                    <button  className="submit" type="submit">Signup</button>
                </div>
            </form>
    </div>


    </>);
}

export default Signup;