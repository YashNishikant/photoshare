import React, { useEffect, useState, setState } from 'react'
import "../Pages/Home.css"
import { db, auth } from '../firebaseconfig'
import { onValue, ref, set } from 'firebase/database';

var msg
var capmsg

function Home() {

  const [item, setItem] = useState("")
  const [list, setList] = useState([])

  const handleChange = (e) => {
      setItem(e.target.value)
  }

  useEffect(() => {
    
    console.log("started")
    onValue(ref(db, "Users" + "/" + localStorage.getItem("authName")), (snapshot) => {
      const data = snapshot.val() 
      {Object.values(data).map(item => (
        setList(oldArray => [...oldArray, item])
      ))
      }
      
    });
  
  }, [])

  
  const writeData = () => {
    set(ref(db, "Users" + "/" + auth.currentUser.displayName + "/" + msg),
    {
        Author: auth.currentUser.displayName,
        MSG: msg,
        Caption: capmsg
    });     
    setItem("")
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

        {list.map((item) => (
          <h2>{item.MSG}</h2>
        ))}

      <header className="App-header">

        <div className='textDiv'>
          <input className="textfield" id="textbox" placeholder='Message'
            onChange={(event)=>{
              msg = event.target.value
            }}
          />
          <input className="textfieldCaption" id="textboxCaption" placeholder='Caption'
            onChange={(event)=>{
              capmsg = event.target.value
            }}
          />
          <button className="signinButton" onClick={writeData}>Submit</button>
        </div>

      </header>
      </div>
    )
  }

}
export default Home