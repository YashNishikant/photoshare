import './App.css';
import {BrowserRouter as Router, Routes, Route, Link, useAsyncError} from "react-router-dom"
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Home from './Pages/Home';
import CreateAccount from './Pages/CreateAccount';
import YourPosts from './Pages/YourPosts';
import Search from './Pages/Search';
import MGlass from './Components/magnifyingGlass.png';
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
        <Router basename='photoshare'>
            <nav className="navDiv">
              <nav className='majorityNav'>
                {!isAuth ? (
                  <Link to ="/photoshare/"> Login </Link>
                  ) : (
                    <Link to ="/photoshare/Login" onClick={signUserOut}> Log Out </Link>
                  )}  

                <Link to ="/photoshare/Dashboard"> Dashboard </Link>  
                <Link to ="/photoshare/Home"> Home </Link>  

                {/* {!isAuth ? (
                  <Link to ="/CreateAccount">Sign Up</Link>
                  ) : (
                    <></>
                  )} */}

                {isAuth ? (
                  <Link to ="/photoshare/YourPosts">Your Posts</Link>
                  ) : (
                    <></>
                  )}    

              </nav>
              <nav className='searchLink'>
              {isAuth ? (
                  <Link className="searchLink" to ="/photoshare/Search"><img src={MGlass}/></Link>
                  ) : (
                    <></>
                  )}    
              </nav>
            </nav>
          <Routes>
            <Route path="/photoshare/" element={<Login setAuth = {setAuth}/>} />
            <Route path="/photoshare/Home" element={<Home/>} />
            <Route path="/photoshare/Dashboard" element={<Dashboard/>} />
            <Route path="/photoshare/YourPosts" element={<YourPosts/>} />
            <Route path="/photoshare/Search" element={<Search/>} /> 

          </Routes>
        </Router>
  );
}

export default App;