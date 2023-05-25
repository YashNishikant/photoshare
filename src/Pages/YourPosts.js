import React, { useEffect, useState} from 'react'
import "../Pages/YourPosts.css"
import { db, storage } from '../firebaseconfig'
import { onValue, ref } from 'firebase/database';
import { getDownloadURL, listAll, ref as refImg } from 'firebase/storage'
import Post from '../Components/Post'

var refImage

function YourPosts() {

  const [list, setList] = useState([])
  const [imageList, setImageList] = useState([])

  useEffect(() => {
    
    setList([])
    setImageList([])

    refImage = (refImg(storage, localStorage.getItem("authName")))
    listAll(refImage).then((ans) => {
      ans.items.forEach((imageitem) => {
        console.log("first: " + imageitem.fullPath)
        getDownloadURL(imageitem).then((url) => {
          console.log("second: " + imageitem.fullPath)
          setImageList((prev) => [...prev, url])
        })
      })
    })

    onValue(ref(db, "Users" + "/" + localStorage.getItem("authName")), (snapshot) => {
      if(snapshot.hasChildren){
        const data = snapshot.val()
        if(data){
          {Object.values(data).map(newitem => (setList(prev => [...prev, newitem])))}
        }
      }
    });}, [])


  if(!localStorage.getItem("isAuth")){
    window.location.pathname = "/Login";
    return(<div>Redirecting...</div>)
  }
  else{
    return (
      <div>

        {list.map((item, index) => {

          return(<>
            <Post key={index} Author={item.Author} Caption={item.Caption} ImageUrl={imageList[index]} Date={item.Date}></Post>
            <hr key={index*10 + 1}/>
          </>)})}
    
    </div>
    )
  }

}
export default YourPosts