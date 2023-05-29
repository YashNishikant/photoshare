import React, { useState } from 'react'
import "../Pages/Login.css"
import {auth, provider} from '../firebaseconfig'
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import googleimage from '../Components/googleLogo.png'
import camlogo from '../Components/camera.png'

function Login({setAuth}) {

    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) =>{
            localStorage.setItem("isAuth",true)
            localStorage.setItem("authName",auth.currentUser.displayName)
            localStorage.setItem("authEmail",auth.currentUser.email)
            localStorage.setItem("authImage",auth.currentUser.photoURL)
            localStorage.setItem("canAccessItems",true)
            
            setAuth(true);
            window.location.pathname = "/";
        });
    }

    const signInEmailPswrd = () => {
        signInWithEmailAndPassword(auth, email, password).then((result) =>{
            localStorage.setItem("isAuth",true)
            localStorage.setItem("authName",auth.currentUser.displayName)
            localStorage.setItem("authEmail",auth.currentUser.email)
            localStorage.setItem("authImage",auth.currentUser.photoURL)
            localStorage.setItem("canAccessItems",true)
            
            if(localStorage.getItem("authName").localeCompare("null")==0){
                var s = ""+auth.currentUser.email
                s = s.substring(0,s.indexOf("@"))
                localStorage.setItem("authName",s)
            }
            
            localStorage.setItem("authEmail",auth.currentUser.email)
            setAuth(true);
            window.location.pathname = "/";
        });
    }

    return (
        <div className="login">    
            <header className="App-header">
            <img className="cameraLogo" src={camlogo}></img>

            <input className="App-login" placeholder='Username' onChange={(e)=>{setEmail(e.target.value)}}/>
            <input className="App-pswrd" placeholder='Password' onChange={(e)=>{setpassword(e.target.value)}} type="password"/>
            
            <button className="signinButton" onClick={signInEmailPswrd} >Sign In</button>
            <button className="googlebutton" onClick={signInWithGoogle}>

            <img src={googleimage} className="googlelogo" border="0"/>
                Continue With Google
            </button>

            </header>
        </div>
    )
}

export default Login