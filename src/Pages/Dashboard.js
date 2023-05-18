import React from 'react'
import "../Pages/Dashboard.css"
import { auth } from '../firebaseconfig'

function Dashboard() {

  if(auth.currentUser==null){
    window.location.pathname = "/Login";
    return (
      <div>
          <div>
          Redirecting...
          </div>
      </div>
    )
  }
  else{
    return (
      <div>
          <div>Dashboard</div>
      </div>
    )
  }

}

export default Dashboard