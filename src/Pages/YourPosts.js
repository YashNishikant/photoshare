import React, {useEffect, useState} from 'react'
import "../Pages/YourPosts.css"
import { db, storage } from '../firebaseconfig'
import { onValue, ref} from 'firebase/database';
import { getDownloadURL, listAll, ref as refImg } from 'firebase/storage'
import Post from '../Components/Post'

var refImage
var thirdPartylist = []
var imageList = []
var list = []
var finalList = []

function YourPosts() {

  //const [list, setList] = useState([])
  //const [imageList, setImageList] = useState([])
  //const [thirdPartylist, setThirdPartylist] = useState([])
  //const [finalList, setFinalList] = useState([])
  const [rerender, setRerender] = useState("")

    useEffect(() => {

        // setList([])
        // setImageList([])

      list=[]
      imageList=[]

      refImage = (refImg(storage, localStorage.getItem("authName")))
        listAll(refImage).then((ans) => {
          ans.items.forEach((imageitem) => {
            getDownloadURL(imageitem).then((url) => {
                //setThirdPartylist((prev) => [...prev, [imageitem.name, url]])
                thirdPartylist.push([imageitem.name, url])
                //setImageList((prev) => [...prev, url])
                imageList.push(url)
                
            })
          })
        })
        onValue(ref(db, "Users" + "/" + localStorage.getItem("authName")), (snapshot) => {
          if(snapshot.hasChildren){
            const data = snapshot.val()
              if(data){
                {Object.values(data).map(newitem => (list.push(newitem)))}
                createfinallist();
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
            //setFinalList(prev => [...prev, t])
            finalList.push(t)
          }
        }
      }
      console.log(finalList)
      setRerender("ee")
    }

  if(!localStorage.getItem("isAuth")){
    window.location.pathname = "/Login";
    return(<div>Redirecting...</div>)
  }
  else{
    return (
      <div>

        {console.log("render")}
        {finalList.map((item) => {
          return(
          <div>
            <div>{rerender}</div>
            <Post Author={item[0].Author} Caption={item[0].Caption} ImageUrl={item[1]} Date={item[0].Date}></Post>
          </div>)})}
          
      </div>

    )
  }

}
export default YourPosts