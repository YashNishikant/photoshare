import React from 'react'
import "../Components/NameNode.css"

function NameNode({handleClick, email, pfpimg, Name}) {

  return (
    <div className="nameNodeDiv">
        <img src={pfpimg} referrerPolicy="no-referrer"/>
        <button onClick={() => handleClick(email)} className="nameNodeButton">{Name}</button>
    </div>
  )
}

export default NameNode
