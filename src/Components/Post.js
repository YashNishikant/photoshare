import React from 'react'
import "../Components/Post.css"

var w=100;
var h=100;

function Post({Author, Caption, ImageUrl, Date}) {
  // const img = new Image()
  // img.src = ImageUrl

  // const ratio = img.height/img.width;

  // if(img.width > 500) w=500
  // else w = img.width

  // if(img.height > 540) h=img.height*ratio
  // else h = img.height

  return(
    <div className='totaldiv'>
        <form>
          <p>{Date}</p>
          <h1>{Author}</h1>
          <img src={ImageUrl} style={{width:w, height:h}}></img>
          <h3>{Caption}</h3>
        </form>
    </div>
  );
}

export default Post