import React, {useEffect, useState} from 'react'
import "../Pages/Search.css"
import { onValue, ref } from 'firebase/database';
import { db } from '../firebaseconfig'

var tempList = []

function Search() {
    
  const [list, setList] = useState([])
  const [inpValue, setInpValue] = useState([])

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
    tempList = list

    for(var i = tempList.length-1; i >= 0; i--){
        if((""+tempList[i]).includes(e.target.value)){
            console.log(tempList[i])
        }
    }

  }

  return (
    <div>
        {list.map((item) => {
            console.log(item)            
        })}

    <header className="Search-header">
        <input className="searchField" placeholder='Search...' onChange={changeList}/>
    </header>
    </div>
  )
}

export default Search