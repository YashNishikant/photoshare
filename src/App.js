import './App.css';
import {BrowserRouter as Router, Routes, Route, Link, useAsyncError} from "react-router-dom"
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Home from './Pages/Home';
import CreateAccount from './Pages/CreateAccount';
import YourPosts from './Pages/YourPosts';
import {signOut} from "firebase/auth"
import { useState } from 'react';
import { auth } from './firebaseconfig';

function App() {
  
  var [isAuth, setAuth] = useState(false);
  isAuth = localStorage.getItem("isAuth")

  const signUserOut = () => {
    signOut(auth).then(()=>{
        localStorage.clear();
        setAuth(false);
        window.location.pathname = "/login";
    })
  };

  return (
        <Router>

            <nav>
              {!isAuth ? (
                <Link to ="/Login"> Login </Link>
                ) : (
                  <Link to ="/Login" onClick={signUserOut}> Log Out </Link>
                )}  


              <Link to ="/Dashboard"> Dashboard </Link>  
              <Link to ="/"> Home </Link>  

              {!isAuth ? (
                <Link to ="/CreateAccount">Sign Up</Link>
                ) : (
                  <></>
                )}

              {isAuth ? (
                <Link to ="/YourPosts">Your Posts</Link>
                ) : (
                  <></>
                )}    

            </nav>

          <Routes>
            <Route path="/Login" element={<Login setAuth = {setAuth}/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/Dashboard" element={<Dashboard/>} />
            <Route path="/YourPosts" element={<YourPosts/>} />
            <Route path="/CreateAccount" element={<CreateAccount setAuth = {setAuth}/>} />

          </Routes>
        </Router>
  );
}

export default App;