import React, { useEffect, useState, setState } from 'react'
import "../Pages/Home.css"
import { db, auth } from '../firebaseconfig'
import { onValue, ref, set } from 'firebase/database';
import Post from '../Components/Post'

var msg
var capmsg

function Home() {

  const [list, setList] = useState([])

  useEffect(() => {
    setList([])
    onValue(ref(db, "Users" + "/" + localStorage.getItem("authName")), (snapshot) => {
      
      if(snapshot.hasChildren){
        const data = snapshot.val()

        if(data){
          {Object.values(data).map(item => (setList(oldArray => [...oldArray, item])))}
        }
      }
    });
  
  }, [])

  
  const writeData = () => {
    setList([])
    set(ref(db, "Users" + "/" + auth.currentUser.displayName + "/" + msg),
    {
        Author: auth.currentUser.displayName,
        PostMessage: msg,
        Caption: capmsg
    });    
  };

  if(!localStorage.getItem("isAuth")){
    window.location.pathname = "/Login";
    
    return(
      <div>
        Redirecting...
      </div>
    )
  }
  else{
    return (
      <div>
        {list.map((item) => (
          <>
            <Post Author={item.Author} PostMessage={item.PostMessage} Caption={item.Caption}></Post>
            <hr/>
          </>
        ))}

      <header className="App-header">

        <div className='textDiv'>
          <input className="textfield" id="textbox" placeholder='Message'
            onChange={(event)=>{
              msg = event.target.value
            }}
          />
          <input className="textfieldCaption" id="textboxCaption" placeholder='Caption'
            onChange={(event)=>{
              capmsg = event.target.value
            }}
          />
          <button className="signinButton" onClick={writeData}>Submit</button>
        </div>

      </header>
      </div>
    )
  }

}
export default Home