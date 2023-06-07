import React, { useEffect, useState } from 'react'
import "../Pages/Home.css"
import { db, auth, storage } from '../firebaseconfig'
import { set, ref, onValue, getDatabase, push } from 'firebase/database';
import { getDownloadURL, listAll, ref as refImg, uploadBytes } from 'firebase/storage'
import defaultPfp from '../Components/defaultpfp.png'

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
    const metadata = auth.currentUser.metadata;

    if ((metadata.creationTime == metadata.lastSignInTime) && localStorage.getItem("firstTime").localeCompare('true')===0 && !(localStorage.getItem("authImage").localeCompare('null')===0)) {

      push(ref(db, "Users/userlist"),
      {
        user: auth.currentUser.displayName,
        email: auth.currentUser.email,
        pfp: auth.currentUser.photoURL
      },
      localStorage.setItem("firstTime", false)
      );
    }
    else if ((metadata.creationTime == metadata.lastSignInTime) && localStorage.getItem("firstTime").localeCompare('true')===0 && (""+auth.currentUser.photoURL).localeCompare('null')===0){

      var diffAccountName = localStorage.getItem("authEmail")
      diffAccountName = diffAccountName.substring(0, diffAccountName.indexOf("@"))

      push(ref(db, "Users/userlist"),
      {
        user: diffAccountName,
        email: auth.currentUser.email,
        pfp: defaultPfp
      },
      localStorage.setItem("firstTime", false)
      );
    } 

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
            if(!((""+auth.currentUser.photoURL).localeCompare('null')===0)){
              set(ref(db, "Users" + "/" + s  + "/" + capmsg),
              {
                  Author: auth.currentUser.displayName,
                  Email: auth.currentUser.email,
                  Caption: capmsg,
                  ImageUrl: finalImage,
                  Date: date.toLocaleString('default', { month: 'long' })+" "+date.getDate()+", "+date.getFullYear(),
                  PfpUrl: auth.currentUser.photoURL
              },
                window.location.pathname = "/YourPosts"
              );
            }
            else{
              var diffAccountName = localStorage.getItem("authEmail")
              diffAccountName = diffAccountName.substring(0, diffAccountName.indexOf("@"))

              set(ref(db, "Users" + "/" + s  + "/" + capmsg),
              {
                  Author: diffAccountName,
                  Email: auth.currentUser.email,
                  Caption: capmsg,
                  ImageUrl: finalImage,
                  Date: date.toLocaleString('default', { month: 'long' })+" "+date.getDate()+", "+date.getFullYear(),
                  PfpUrl: defaultPfp
              },
                window.location.pathname = "/YourPosts"
              );
            }

          })
        })
      })
    }) 
    setCapMsg("")
    setImage(null)
  };

if(!localStorage.getItem("isAuth")){
  window.location.pathname = "/Login";
  return(<div>Redirecting...</div>)
}
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