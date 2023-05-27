import React, {useEffect, useState} from 'react'
import "../Pages/YourPosts.css"
import { db } from '../firebaseconfig'
import { onValue, ref} from 'firebase/database';
import Post from'../Components/Post'

function YourPosts() {

  const [list, setList] = useState([])

  useEffect(() => {
    setList([])      
    onValue(ref(db, "Users" + "/" + localStorage.getItem("authName")), (snapshot) => {
      if(snapshot.hasChildren){
        const data = snapshot.val()
          if(data){
            console.log(data)
            {Object.values(data).map(newitem => (setList(prev => [...prev, newitem])))}
          }
        }
    });
  }, [])

  const clearList = ()=>{
    setList([])
  }

  if(!localStorage.getItem("isAuth")){
    window.location.pathname = "/Login";
    return(<div>Redirecting...</div>)
  }
  else{
    return (
      <div>
        {list.map((item) => {
          return(
          <div onLoad={clearList}>
            <Post Author={item.Author} Caption={item.Caption} ImageUrl={item.ImageUrl} Date={item.Date}></Post>
          </div>)})}
          
      </div>

    )
  }

}
export default YourPosts