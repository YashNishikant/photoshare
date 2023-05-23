import React, { useState, useEffect } from 'react'
import "../Pages/Dashboard.css"
import { auth } from '../firebaseconfig'

function Dashboard() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    setName(localStorage.getItem("authName"))    
    setEmail(localStorage.getItem("authEmail"))
  }, [])

  if(auth.currentUser==null){
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
        <h1>Posts: </h1>
      </div>
    )
  }

}

export default Dashboard