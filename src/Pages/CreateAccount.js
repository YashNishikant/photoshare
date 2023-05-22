import React from 'react'
import { useState } from 'react';
import {auth} from '../firebaseconfig'

import { createUserWithEmailAndPassword } from 'firebase/auth'

function CreateAccount({setAuth}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createAcc = () => {
        createUserWithEmailAndPassword(auth, email, password).then((result) =>{
            localStorage.setItem("isAuth",true)
            localStorage.setItem("authName",auth.currentUser.displayName)
            setAuth(true);
            window.location.pathname = "/Login";
        });
    }

    return (
        <div className="login">    
            <header className="App-header">

            <input className="App-login" placeholder='Username' onChange={(e)=>{setEmail(e.target.value)}}/>
            <input className="App-pswrd" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
            
            <button className="signinButton" onClick={createAcc}>Sign Up</button>

            </header>
        </div>
    )
}

export default CreateAccount