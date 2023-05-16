import React, { useState } from 'react'
import "../Pages/Home.css"
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../firebaseconfig'

function Home() {

  const [title, setTitle] = useState("");
  const collectionRef = collection(db, "message");

  const writeData = async () => {
    await addDoc(collectionRef, {title, author: {name: auth.currentUser.displayName, id: auth.currentUser.uid}})
    document.getElementById("textbox").value="";
  };

  return (
    <div>
    <header className="App-header">
        <input className="textfield" id="textbox"
          onChange={(event)=>{
            setTitle(event.target.value)
          }}>
        </input>
      
        <button onClick={writeData}>Submit</button>

      </header>
    </div>
  )
}

export default Home