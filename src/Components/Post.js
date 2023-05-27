import React from 'react'
import "../Components/Post.css"

var w;
var h;
var oldWidth;
var newWidth;

function Post({Author, Caption, ImageUrl, Date}) {

  const img = new Image()
  img.src = ImageUrl

  oldWidth = img.width;
  newWidth = img.Width

  if(img.width > 500) {
    w=500
    newWidth = 500;
  }
  else 
    w = img.width
  
  if(img.height > 500) {
    const ratio = (newWidth/oldWidth)
    h=img.height*(ratio)
  }

  else 
    h = img.height

  return(
    <div className='totaldiv'>
        <form>
          {<p>{Date}</p>}
          <h1>{Author}</h1>
          {/* <img src={ImageUrl} style={{width:w, height:h}}></img>*/}
          <img src={ImageUrl}></img>
          <hr/>
          {<h3>{Caption}</h3>}
        </form>
    </div>
  );
}

export default Post