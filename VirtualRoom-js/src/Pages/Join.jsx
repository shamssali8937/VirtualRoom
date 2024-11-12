import  { useState } from 'react';
import  "../Css/Join.css";
function Join()
{
    let [isteacher,setisteacher]=useState(false);
    let switchforms=()=>{
        setisteacher(!isteacher);
    }
    return(
        <>
        <div className="join-container">
            <h2>JOIN AS...</h2>
            <div className="btn-grp">
               <button className={!isteacher?'active':''} onClick={switchforms}>Student</button>
               <button className={isteacher?'active':''} onClick={switchforms}>Teacher</button>
            </div>
            <form className="form-box">
                <input type="text" placeholder='Enter you name'/>
                {!isteacher?(
                    <>
                    <input type="number" step="0.01" placeholder='CGPA'/>
                    <input type="text" placeholder='Program' />
                    </>
                ):(
                  <>
                  <input type="text" placeholder='Department' />
                  </>  
                )}
                <button>Join</button>
            </form>
        </div>
        </>
    );

}

export default Join;