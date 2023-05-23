import React, { useEffect, useState, setState, useContext, useRef } from 'react'
import "../Pages/Home.css"
import { db, auth, storage } from '../firebaseconfig'
import { onValue, set, ref } from 'firebase/database';
import { ref as refImg, uploadBytes } from 'firebase/storage'
import Post from '../Components/Post'

function Home() {

  const [msg, setMsg] = useState("")
  const [capmsg, setCapMsg] = useState("")
  const [image, setImage] = useState(null)
  const [list, setList] = useState([])
  const [name, setName] = useState("")

  const writeData = () => {
    setList([])
    if(image==null || msg==null) return
    var s = image.name
    s = s.substring(0,s.indexOf("."))
    const refobj = refImg(storage, localStorage.getItem("authName") + '/' + s)
    uploadBytes(refobj, image).then(()=>{
      alert("hi")
    })
    set(ref(db, "Users" + "/" + localStorage.getItem("authName") + "/" + msg),
    {
        Author: auth.currentUser.displayName,
        PostMessage: msg,
        Caption: capmsg
    });
    setMsg("")
    setCapMsg("")
    setImage(null)
  };

  useEffect(() => {
    setList([])

    if(localStorage.getItem("authName").localeCompare("null")==0){
      var s = localStorage.getItem("authEmail")
      s = s.substring(0, s.indexOf("@"))
      setName(s)
    }
    else{setName(localStorage.getItem("authName"))}
    onValue(ref(db, "Users" + "/" + localStorage.getItem("authName")), (snapshot) => {
      if(snapshot.hasChildren){
        const data = snapshot.val()
        if(data){ 
          {Object.values(data).map(newitem => (setList(prev => [...prev, newitem])))}
        }
      }
    });
  }, [])


  if(!localStorage.getItem("isAuth")){
    window.location.pathname = "/Login";
    return(<div>Redirecting...</div>)
  }
  else{
    return (
      <div>
        <h2>Hello {name}</h2>

        {list.map((item) => {
          console.log(item)
          return(<>
            <Post Author={item.Author} PostMessage={item.PostMessage} Caption={item.Caption}></Post>
            <hr/>
          </>)})}

      <header className="App-header">
        <div className='textDiv'>
          <input value = {msg} className="textfield" id="textbox" placeholder='Message'
            onChange={(event)=>{
              setMsg(event.target.value)
            }}
          />
          <input value = {capmsg} className="textfieldCaption" id="textboxCaption" placeholder='Caption'
            onChange={(event)=>{
              setCapMsg(event.target.value)
            }}
          />
          <input type="file" onChange={(event)=>{setImage(event.target.files[0])}}></input>
          <button className="signinButton" onClick={writeData}>Submit</button>
        </div>
      </header>
      </div>
    )
  }

}
export default Home