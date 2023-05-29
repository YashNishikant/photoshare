import React, { useEffect, useState } from 'react'
import "../Pages/Home.css"
import { db, auth, storage } from '../firebaseconfig'
import { set, ref, onValue, getDatabase, push } from 'firebase/database';
import { getDownloadURL, listAll, ref as refImg, uploadBytes } from 'firebase/storage'

var s
var refImage
var refImage2
var finalImage

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
    if(image==null || capmsg==null) {
      return
    }

    push(ref(db, "Users/userlist"),
    {
      user: auth.currentUser.displayName,
      email: auth.currentUser.email,
      pfp: auth.currentUser.photoURL
    },
    );

    localStorage.setItem("canAccessItems",false)
    var s = image.name
    s = s.substring(0,s.indexOf("."))
    const date = new Date();
    refImage = (refImg(storage, localStorage.getItem("authEmail") + '/' + s))
    uploadBytes(refImage, image).then(()=>{
      var imageName1=image.name
      imageName1=imageName1.substring(0,imageName1.indexOf('.'))
      refImage2 = (refImg(storage, localStorage.getItem("authEmail")))
      listAll(refImage2).then((ans) => {
        ans.items.forEach((imageitem) => {
          getDownloadURL(imageitem).then((url) => {
            var imageName2=imageitem.name
            if((""+imageName1).localeCompare(""+imageName2)===0){
              finalImage=url
            }

            var s = localStorage.getItem("authEmail")
            s = s.replace("@","")
            s = s.replace(".","")
            set(ref(db, "Users" + "/" + s  + "/" + capmsg),
            {
                Author: auth.currentUser.displayName,
                Email: auth.currentUser.email,
                Caption: capmsg,
                ImageUrl: finalImage,
                Date: date.toLocaleString('default', { month: 'long' })+" "+date.getDate()+", "+date.getFullYear()
            },
            localStorage.setItem("canAccessItems",true),
            console.log("SET TO TRUE")
            );
          })
        })
      })
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