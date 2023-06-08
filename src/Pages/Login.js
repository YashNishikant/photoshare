import React, { useState } from 'react'
import "../Pages/Login.css"
import { useNavigate } from 'react-router';
import {auth, provider} from '../firebaseconfig'
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import googleimage from '../Components/googleLogo.png'
import camlogo from '../Components/camera.png'

function Login({setAuth}) {

    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate()

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) =>{
            localStorage.setItem("isAuth",true)
            localStorage.setItem("authName",result.user.displayName)
            localStorage.setItem("authEmail",result.user.email)
            localStorage.setItem("authImage",result.user.photoURL)
            localStorage.setItem("authCreation",result.user.metadata.creationTime)
            localStorage.setItem("canAccessItems",true)
            localStorage.setItem("firstTime", true)
            setAuth(true);
            
            navigate("/Home")

        });
    }

    // const signInEmailPswrd = () => {
    //     signInWithEmailAndPassword(auth, email, password).then((result) =>{
    //         localStorage.setItem("isAuth",true)
    //         localStorage.setItem("authName",result.user.displayName)
    //         localStorage.setItem("authEmail",result.user.email)
    //         localStorage.setItem("authImage",result.user.photoURL)
    //         localStorage.setItem("authCreation",result.user.metadata.creationTime)
    //         localStorage.setItem("canAccessItems",true)
    //         localStorage.setItem("firstTime", true)

    //         console.log(result.user.providerData)
            
    //         if(localStorage.getItem("authName").localeCompare("null")==0){
    //             var s = ""+result.user.email
    //             s = s.substring(0,s.indexOf("@"))
    //             localStorage.setItem("authName",s)
    //         }
            
    //         localStorage.setItem("authEmail",result.user.email)
    //         setAuth(true);
    //         window.location.pathname = "/photoshare/Home";
    //     });
    // }

    return (
        <div className="login">    
            <header className="login-header">
            <img className="cameraLogo" src={camlogo}></img>

            {/* <input className="App-login" placeholder='Username' onChange={(e)=>{setEmail(e.target.value)}}/>
            <input className="App-pswrd" placeholder='Password' onChange={(e)=>{setpassword(e.target.value)}} type="password"/> */}
            
            {/* <button className="signinButton" onClick={signInEmailPswrd} >Sign In</button> */}
            
            <button className="googlebutton" onClick={signInWithGoogle}>
            <img src={googleimage} className="googlelogo" border="0"/>
                Continue With Google
            </button>

            </header>
        </div>
    )
}

export default Login