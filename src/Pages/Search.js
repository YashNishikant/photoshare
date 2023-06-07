import React, {useEffect, useState} from 'react'
import "../Pages/Search.css"
import { onValue, ref, set } from 'firebase/database';
import { db } from '../firebaseconfig'
import NameNode from '../Components/NameNode'
import Post from'../Components/Post'

var tempList = []

function Search() {
    
  const [list, setList] = useState([])
  const [listShow, setListShow] = useState([])
  const [listDisplay, setListDisplay] = useState([])
  const [emailnode, setEmailNode] = useState("")
  const [otherUser, setOtherUser] = useState([])

  useEffect(() => {
    setList([])
    onValue(ref(db, "Users/userlist"), (snapshot) => {
      if(snapshot.hasChildren){
        const data = snapshot.val()
        if(data){
            for(var key in data){
                onValue(ref(db, "Users/userlist/"+key), (snapshot) => {
                    const data = snapshot.val()
                    Object.values(data).map(newitem => (setList(prev => [...prev, newitem])))
                })
            }
          }
        }
    });
  }, [])

  function changeList(e) {

    setListDisplay([])

    if(list.length > 0){
        var j=0
        for(var i = 2; i < list.length; i+=3){
            listShow[j]=[list[i-2],list[i-1],list[i]]
            j++
        }

        tempList = listShow 
        for(var i = tempList.length-1; i >= 0; i--){
          var s1 = (""+tempList[i][2]).toLocaleLowerCase()
          var s2 = (""+e.target.value).toLocaleLowerCase()
            if((s1).includes(s2)){
                const a = [tempList[i][0], tempList[i][1], tempList[i][2]]
                setListDisplay(prev => [...(prev), a])
            }
        }
    }
    
    if(e.target.value===""){
      setListDisplay([])
    }

  }

  const clickevent = (e) => {

    setOtherUser([])

    var s = e
    s = s.replace("@","")
    s = s.replace(".","")
 
    onValue(ref(db, "Users/"+s), (snapshot) => {
      const data = snapshot.val()
      
      if(!data){
        setOtherUser([])
        alert("User has no posts")
      }
      else{
        Object.values(data).map(newitem => (setOtherUser(prev => [...prev, newitem])))
      }
    })
  }

  return (
    <div>
    <header className="Search-header">
      <input className="searchField" placeholder='Search...' onChange={changeList}/>
   
      {listDisplay.map((item) => {
          return(
            <div>
              <h1>{emailnode}</h1>
              <NameNode handleClick={clickevent} email={item[0]} pfpimg={item[1]} Name={item[2]}  ></NameNode>
            </div>
          )
      })}

    </header>
    
    <div>
      {otherUser.map((item) => {
        return(
          <div className='post' >
            <Post Author={item.Author} Caption={item.Caption} ImageUrl={item.ImageUrl} Date={item.Date} pfpImg={item.PfpUrl} canRemove={false}></Post>
          </div>
        )
      })}
    </div>
        
    </div>
  )
}

export default Search