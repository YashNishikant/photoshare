import React from 'react'
import "../Pages/Login.css"
import {auth, provider} from '../firebaseconfig'
import { signInWithPopup } from 'firebase/auth'
import googleimage from '../Components/googleLogo.png'
import camlogo from '../Components/camera.png'

function Login({setAuth}) {

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) =>{
            localStorage.setItem("isAuth",true)
            localStorage.setItem("authName",auth.currentUser.displayName)
            setAuth(true);
            window.location.pathname = "/";
        });

    }

    return (
        <div className="login">    
            <header className="App-header">
            <img className="cameraLogo" src={camlogo}></img>

            <input className="App-login" placeholder='Username'/>
            <input className="App-pswrd" placeholder='Password'/>
            
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