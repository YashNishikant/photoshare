import React, { useState, useEffect } from 'react'
import "../Pages/Dashboard.css"
import { db, auth } from '../firebaseconfig'
import { onValue, ref } from 'firebase/database'

var i = 0

function Dashboard() {

  const [count, setCount] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const inc = () => {
     setCount(count+1)
     i++
  }

  useEffect(() => {
    setName(localStorage.getItem("authName"))    
    setEmail(localStorage.getItem("authEmail"))

    if(localStorage.getItem("authName").localeCompare("null")==0){
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
        <h1>Welcome {name}</h1>
        <h1>Email: {email}</h1>
        <h1>Posts: {i} </h1>
      </div>
    )
  }

}

export default Dashboard