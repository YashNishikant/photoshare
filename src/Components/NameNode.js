import React from 'react'
import "../Components/NameNode.css"

function NameNode({handleClick, pfpimg, Name, email}) {

  return (
    <div className="nameNodeDiv">
        <img src={pfpimg}></img>
        <button onClick={() => handleClick(email)} className="nameNodeButton">{Name}</button>
    </div>
  )
}

export default NameNode
