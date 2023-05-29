import React from 'react'
import "../Components/Post.css"

var w;
var h;
var oldWidth;
var newWidth;

function Post({Author, Caption, ImageUrl, Date, pfpImg}) {

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

          <div className='authordiv'>
            
            <img className="pfpPost" src={pfpImg} referrerPolicy="no-referrer"></img>
            <p className="authorname">{Author}</p>
            <p className="date" >{Date}</p>
          </div>
        
          <hr/>
          <img src={ImageUrl}></img>
          <p>{Author}: {Caption}</p>
        </form>
    </div>
  );
}

export default Post