import React, { useEffect, useState } from 'react'
import "../Pages/Home.css"
import { db, auth, storage } from '../firebaseconfig'
import { set, ref, onValue } from 'firebase/database';
import { ref as refImg, uploadBytes } from 'firebase/storage'

var s
var refImage
var i=0


function Home() {

  const [capmsg, setCapMsg] = useState("")
  const [image, setImage] = useState(null)
  const [name, setName] = useState("")

  useEffect(() => {
    if(localStorage.getItem("authName").localeCompare("null")==0){
      s = localStorage.getItem("authEmail")
      s = s.substring(0, s.indexOf("@"))
      setName(s)
    }
    else{setName(localStorage.getItem("authName"))}
  });

  const writeData = () => {
    
    if(image==null || capmsg==null) return
    var s = image.name
    s = s.substring(0,s.indexOf("."))
    const date = new Date();
    i++
    set(ref(db, "Users" + "/" + localStorage.getItem("authName") + "/" + capmsg),
    {
        id:i,
        Author: auth.currentUser.displayName,
        Caption: capmsg,
        ImageName: s,
        Date: date.toLocaleString('default', { month: 'long' })+" "+date.getDate()+", "+date.getFullYear()
    });
    refImage = (refImg(storage, localStorage.getItem("authName") + '/' + s))
    uploadBytes(refImage, image).then(()=>{
      alert("hi")
    }) 

    setCapMsg("")
    setImage(null)
    
  };

return (
  <div>
  <header className="App-header">
    <h2 className="nametag">{name}</h2>
    <div className='textDiv'>
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
export default Home