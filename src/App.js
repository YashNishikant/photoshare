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
        window.location.pathname = "/photoshare";
    })
  };

  return (

        <Router basename='photoshare'>
            <nav className="navDiv">
              <nav className='majorityNav'>
                {!isAuth ? (
                  <Link to ="/"> Login </Link>
                  ) : (
                    <Link to ="/" onClick={signUserOut}> Log Out </Link>
                  )}  

                <Link to ="/Dashboard"> Dashboard </Link>  
                <Link to ="/Home"> Home </Link>  

                {/* {!isAuth ? (
                  <Link to ="/CreateAccount">Sign Up</Link>
                  ) : (
                    <></>
                  )} */}

                {isAuth ? (
                  <Link to ="/YourPosts">Your Posts</Link>
                  ) : (
                    <></>
                  )}    

              </nav>
              <nav className='searchLink'>
              {isAuth ? (
                  <Link className="searchLink" to ="/Search"><img src={MGlass}/></Link>
                  ) : (
                    <></>
                  )}    
              </nav>
            </nav>
          <Routes>
            <Route path="/" element={<Login setAuth = {setAuth}/>} />
            <Route path="/Home" element={<Home/>} />
            <Route path="/Dashboard" element={<Dashboard/>} />
            <Route path="/YourPosts" element={<YourPosts/>} />
            <Route path="/Search" element={<Search/>} /> 

          </Routes>
        </Router>
  );
}

export default App;