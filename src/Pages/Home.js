import React, { useEffect, useState } from 'react'
import "../Pages/Home.css"
import { db, auth } from '../firebaseconfig'
import { push, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

function Home() {

  const [msg, setMsg] = useState("")

  const writeData = () => {
    set(ref(db, "Users" + "/" + auth.currentUser.displayName + "/" + msg),
    {
        MSG: msg
    }); 
  };

  if(!localStorage.getItem("isAuth")){
    window.location.pathname = "/Login";
    
    return(
      <div>
        Redirecting...
      </div>
    )
  }
  else{
    return (
      <div>
      <header className="App-header">
          <input className="textfield" id="textbox"
            onChange={(event)=>{
              setMsg(event.target.value)
            }}
          />
          
          <button className="signinButton" onClick={writeData}>Submit</button>

      </header>

      <ul>
        <li>hi1</li>
        <li>hi1</li>
        <li>hi1</li>
      </ul>

      </div>
    )
  }

}
export default Home