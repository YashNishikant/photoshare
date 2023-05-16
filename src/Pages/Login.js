import React from 'react'
import "../Pages/Login.css"
import {auth, provider} from '../firebaseconfig'
import { signInWithPopup, getAuth } from 'firebase/auth'

function Login({setAuth}) {

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) =>{
            localStorage.setItem("isAuth",true)
            setAuth(true);
            window.location.pathname = "/";
        });

    }

    return (
        <div className="login">      
            <header className="App-header">
            <input className="App-login"></input>
            <input className="App-pswrd"></input>
            
            <button className="loginButton" onClick={signInWithGoogle}>Sign In</button>

            </header>
        </div>
    )
}

export default Login