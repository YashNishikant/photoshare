import React from 'react'
import "../Pages/Login.css"
import {auth, db, provider} from '../firebaseconfig'
import { signInWithPopup, getAuth } from 'firebase/auth'
import googleimage from '../Components/googleLogo.png'
import camlogo from '../Components/camera.png'

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
            <img className="cameraLogo" src={camlogo}></img>

            <input className="App-login" placeholder='Username'></input>
            <input className="App-pswrd" placeholder='Password'></input>
            
            <button className="signinButton">Sign In</button>
            
            <button className="googlebutton" onClick={signInWithGoogle}>
            <img src={googleimage} className="googlelogo" border="0"/>
                Continue With Google
            </button>

            </header>
        </div>
    )
}

export default Login