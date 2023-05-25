import React, { useState, useEffect } from 'react'
import "../Pages/Dashboard.css"
import { db, auth } from '../firebaseconfig'
import { onValue, ref } from 'firebase/database'
import defaultImg from '../Components/defaultpfp.png'

function Dashboard() {

  const [count, setCount] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const inc = () => {
     setCount(prevState => prevState + 1)
  }

  useEffect(() => {
    setCount(0)  
    setName(localStorage.getItem("authName"))    
    setEmail(localStorage.getItem("authEmail"))

    if(localStorage.getItem("authName").localeCompare("null")===0){
      var s = localStorage.getItem("authEmail")
      s = s.substring(0, s.indexOf("@"))
      setName(s)
    }
    else{setName(localStorage.getItem("authName"))}
    onValue(ref(db, "Users" + "/" + localStorage.getItem("authName")), (snapshot) => {
      if(snapshot.hasChildren){
        const data = snapshot.val()
          for(var key in data){
            inc()
          }
      }
    });

    if((""+localStorage.getItem("authImage")).localeCompare("null")===0){
      localStorage.setItem("authImage", defaultImg.link)
    }

  }, [])


  if(!localStorage.getItem("isAuth")){
    window.location.pathname = "/Login";
    return (
      <div>
        Redirecting...
      </div>
    )
  }
  else{
    return (
      <div>

      <img className="pfp" src={localStorage.getItem("authImage")}/>
      <h1 className="welcome">Welcome {name}</h1>

      <hr></hr>

        <div className="infoDiv">
            <h1>Email: {email}</h1>
            <h1>Posts: {count} </h1>
            <h1>Account Creation: {localStorage.getItem("authDate")} </h1>
        </div>
      </div>
    )
  }

}

export default Dashboard