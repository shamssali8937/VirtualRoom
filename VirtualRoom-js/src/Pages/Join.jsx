import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import  "../Css/Join.css";

function Join()
{
    let navigate=useNavigate();
    let [isteacher,setisteacher]=useState(true);
    let [name, setname] = useState(" ");
    let switchforms=()=>{
        setisteacher(!isteacher);
    }
    let [datas,setDatas]=useState({
        userid:0,
        rollno:" ",
        cgpa:0.0,
        program:" "
    });
    let [datat,setDatat]=useState({
        userid:0,
        Department:" "
    });

    const handlechange=(e)=>{
        const {name,value}=e.target;
        if(isteacher)
        {
            setDatat((prevdata)=>({
                ...prevdata,
                [name]:value
            }));
        }
        else
        {
            setDatas((prevdata)=>({
                ...prevdata,
                [name]:value
            }));
        }
    }

    const handlejoin=()=>{
        axios.post("https://localhost:7040/api/virtual/Getuserid",{name}).then(respone=>{
            if(respone.statuscode===200)
            {
                const id=respone.data.user.userid;
                if(!isteacher)
                {
                   const student={
                    userid:id,
                    rollno:datas.rollno,
                    cgpa:datas.cgpa,
                    program:datas.program
                   };   
                   axios.post("https://localhost:7124/api/Virtual/Addstudent",student).then(respone=>{
                    if(respone.statuscode===200)
                    {
                        alert("joined");
                        navigate("/login1");
                    }
                    else
                    {
                        console.log(respone);
                    }
                   });
                }
                else{
                  const teacher={
                    userid:id,
                    Department:datat.Department
                  };

                  axios.post("https://localhost:7124/api/Virtual/Addteacher",teacher).then(respone=>{
                    if(respone.statuscode===200)
                    {
                          alert("joined as teacher");
                          navigate("/login1");
                    }
                    else
                    {
                        console.log(respone);
                        
                    }
                  });
                }
            }
        
        });
    };

    return(
        <>
        <div className="join-container">
            <h2>JOIN AS...</h2>
            <div className="btn-grp">
               <button className={!isteacher?'active':''} onClick={switchforms}>Student</button>
               <button className={isteacher?'active':''} onClick={switchforms}>Teacher</button>
            </div>
            <form className="form-box" onSubmit={handlejoin}>
                <input type="text" placeholder='Name' name="name" value={name} onChange={handlechange}/>
                {!isteacher?(
                    <>
                    <input type="number" step="0.01" placeholder='CGPA' name="cgpa" value={datas.cgpa} onChange={handlechange} required/>
                    <input type="text" placeholder='Program' name="program" value={datas.program} onChange={handlechange} required/>
                    </>
                ):(
                  <>
                  <input type="text" placeholder='Department' name="department" value={datat.Department} onChange={handlechange} required/>
                  </>  
                )}
                <button type="submit">Join</button>
            </form>
        </div>
        </>
    );

}

export default Join;