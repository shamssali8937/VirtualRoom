import { useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { IoSettingsOutline } from "react-icons/io5";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'
import Navbar1 from "../components/Navbar1";
import { LuHome } from "react-icons/lu";
import { PiStudentBold } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaTasks, FaFolder } from "react-icons/fa";
import "../Css/Landpage1.css";
  

function Landpage1(){


    let [classes, setClasses] = useState([]);
    let [isteacher,setisteacher]=useState();

    let [click,setclick]=useState(false);

    const handleclick=()=>{
        setclick(!click);
    }

   let [data,setData]=useState({
    name:"",
    username:"",
    email:""
});
    let navigate=useNavigate();
    const tokenexpiry=(token)=>{
        if(!token)
        {
            return true;
        }
        let decodetoken=jwtDecode(token);
        if(!decodetoken||!decodetoken.exp)
          {
            console.log("error in decoding token");
            return true;
          }
        else{
          
            let time=Date.now()/1000;
            return decodetoken.exp<time;
        }
       };
    
       useEffect(()=>{
         const token=localStorage.getItem('token');
         if(!token){
            console.log("Not authourized");
            navigate('/login1');  
         }
         else{
            
            if(tokenexpiry(token))
            {
                localStorage.removeItem('token');     
                navigate('/login1');
                alert("please login again");
                return;
            }
            axios.defaults.headers.common['Authorization']=`Bearer ${token}`;    
            axios.get("https://localhost:7124/api/Virtual/Getuser").then((response)=>{
                if(response.data.statuscode==200)
                {
                    const user=response.data.user;
                    setData({
                        name:user.name,
                        username:user.username,
                        email:user.email
                    });
                }
                else
                {
                    alert("please login with correct credentials");
                    localStorage.removeItem('token');
                }
            })
            axios.get("https://localhost:7124/api/Virtual/Isteacher").then((response)=>{
                if(response.data.statuscode===200)
                {
                    setisteacher(isteacher=response.data.statusmessage);
                    console.log("isteacher",isteacher.toLowerCase());         
                }
                else
                {
                    console.log("no teacher exist");
                }
         });
         
        }
       
    
},[navigate]);

     useEffect(()=>{
        if(!isteacher)
            {
               axios.get("https://localhost:7124/api/Virtual/Classlit").then((response)=>{
                   if(response.data.statuscode===200)
                   {
                       setClasses(response.data.classes);
                   }
                   else
                   {
                       console.log(response.data.statuscode);
                   }
               });
               
            }
            else
            {
               axios.get("https://localhost:7124/api/Virtual/Teacherclasses").then((response)=>{
                   if(response.data.statuscode===200)
                   {
                       setClasses(response.data.classes);
                   }
                   else
                   {
                       console.log(response.data.statuscode);
                   }
            });
            }
     },[isteacher])

    
   
    return(
        <>
        <Navbar1 userdata={data}/>
        <div className="sidebar">
            <nav>
                <ul>
                <li><a href=""><LuHome className="side-icons"/>Home</a></li>
                </ul>
                <div className="underline">
                </div>
                <div className="section">
                    <ul>
                        <li><a className="btn"  onClick={(e)=>{ e.preventDefault(); handleclick();}}><PiStudentBold className="side-icons"/>Enrolled</a>
                        {
                            click&&(
                                
                                    <ul>
                                    {
                                          classes.map((item)=>{
                                              return(
                                               <li className="list" key={item.classid}>{item.classname}</li>   
                                              )
                                          })
                                      }
                                  </ul>   
                        )}
                        
                        </li>

                    </ul>
                
                    <ul>
                    <li><a href=""><IoDocumentTextOutline className="side-icons"/>To Do</a></li>
                    </ul>
                </div>
                <div className="underline">
                </div>
                <ul id="setting">
                <li><a href="#"><IoSettingsOutline className="side-icons"/> Settings</a></li>
                </ul>
            </nav>
        </div>




        
        <div className="main-content">
     {
               classes.map((item)=>{
                return(
                <div className="class-box" key={item.classid}>
                <div className="class-header">
                    <h3>{item.classname}</h3>
                    <p>{item.classname}</p>
                </div>
                <div className="class-body">
    
                </div>
                <div className="class-footer">
                <FaTasks className="footer-icon" title="Assignments" />
                <FaFolder className="footer-icon" title="Materials" />
                </div>
              </div>
                );
               })
     }
        
        </div>
        </>
         
    )   
}

export default Landpage1;