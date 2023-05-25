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
  const [thirdPartylist, setThirdPartylist] = useState([])
  const [finalList, setFinalList] = useState([])

  useEffect(() => {
      setList([])
      setImageList([])

      refImage = (refImg(storage, localStorage.getItem("authName")))
      listAll(refImage).then((ans) => {
        ans.items.forEach((imageitem) => {
          getDownloadURL(imageitem).then((url) => {
            setThirdPartylist((prev) => [...prev, [imageitem.name, url]])
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
      });
    }, [])

    const createfinallist = () => {
        for(var i = 0; i < list.length; i++){
          for(var j = 0; j < thirdPartylist.length; j++){
            const n = list[i].ImageName

            if((""+n).localeCompare(thirdPartylist[j][0])===0){
              const t = [list[i], thirdPartylist[j][1]]
              setFinalList(prev => [...prev, t])
            }
          }
        }
    }

  if(!localStorage.getItem("isAuth")){
    window.location.pathname = "/Login";
    return(<div>Redirecting...</div>)
  }
  else{
    return (
      <div>
        <div>
          <button onClick={createfinallist}>Load Posts</button>
        </div>

        {finalList.map((item, index) => {
          return(<>
            {<Post key={"eee"+index} Author={item[0].Author} Caption={item[0].Caption} ImageUrl={item[1]} Date={item[0].Date}></Post>}
          </>)})}
      </div>

    )
  }

}
export default YourPosts