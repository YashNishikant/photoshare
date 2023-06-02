import React, {useEffect, useState} from 'react'
import "../Pages/YourPosts.css"
import { db } from '../firebaseconfig'
import { onValue, ref} from 'firebase/database';
import Post from'../Components/Post'

function YourPosts() {

  const [list, setList] = useState([])

  useEffect(() => {

    setList([])      
    var s = localStorage.getItem("authEmail")
    s = s.replace("@","")
    s = s.replace(".","")
    onValue(ref(db, "Users" + "/" + s), (snapshot) => {
      
      if(snapshot.hasChildren){
        const data = snapshot.val()
        if(data){
            {Object.values(data).map(newitem => (setList(prev => [...prev, newitem])))}
          }
        }
    });
  }, [])


  if(!localStorage.getItem("isAuth")){
    window.location.pathname = "/Login";
    return(<div>Redirecting...</div>)
  }
  else{
    return (
      <div>

        {list.map((item) => {
          if(item.Author){
            return(
            <div className="post">
              <Post Author={item.Author} Caption={item.Caption} ImageUrl={item.ImageUrl} Date={item.Date} pfpImg={item.PfpUrl} canRemove={true}></Post>
            </div>)
          }
        })}
          
      </div>

    )
  }

}
export default YourPosts