import React, { useState } from 'react'
import "../Components/Post.css"
import removeImg from "../Components/Remove.png"
import { db } from '../firebaseconfig'
import { onValue, ref, remove} from 'firebase/database';

function Post({Author, Caption, ImageUrl, Date, pfpImg, canRemove}) {

const [w, setW] = useState(0);
const [h, setH] = useState(0);

const img = new Image();
img.src = ImageUrl;

img.onload = () => {
  var oldWidth = img.width;
  var newWidth = img.width;
  const height = img.height;
  
  if(oldWidth > 500) {
    setW(500)
    newWidth = 500;
  }
  else{
    setW(img.width)
  }
  if(height > 500) {
    const ratio = (newWidth/oldWidth)
    setH(height*(ratio))
  }
  else 
    setH(height)

};

const removePost = () => {
  var s = localStorage.getItem("authEmail")
  s = s.replace("@","")
  s = s.replace(".","")

  remove(ref(db, "Users" + "/" + s + "/" + Caption))

  window.location.pathname = "/YourPosts";
}

if(canRemove){
  return(
    <div className='totaldiv'>
          <div className='authordiv'>
            <img className="pfpPost" src={pfpImg} referrerPolicy="no-referrer"></img>
            <p className="authorname">{Author}</p>
            <p className="date" >{Date}</p>
          </div>
        
          <hr/>
          <img src={ImageUrl} style={{width:w, height:h}}></img>
          <p>{Author}: {Caption}</p>
        <div className='trash'>
          <img src={removeImg} onClick={removePost}></img>
        </div>
    </div>
  );
  }
  else{
    return(
      <div className='totaldiv'>
        <div className='authordiv'>
          
          <img className="pfpPost" src={pfpImg} referrerPolicy="no-referrer"></img>
          <p className="authorname">{Author}</p>
          <p className="date" >{Date}</p>
        </div>
      
        <hr/>
        <img src={ImageUrl} style={{width:w, height:h}}></img>
        <p>{Author}: {Caption}</p>
      </div>
    );
  }
}

export default Post