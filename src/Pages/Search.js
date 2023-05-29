import React, {useEffect, useState} from 'react'
import "../Pages/Search.css"
import { onValue, ref } from 'firebase/database';
import { db } from '../firebaseconfig'
import NameNode from '../Components/NameNode'

var tempList = []

function Search() {
    
  const [list, setList] = useState([])
  const [listShow, setListShow] = useState([])
  const [listDisplay, setListDisplay] = useState([])

  useEffect(() => {
    setList([])
    onValue(ref(db, "Users/userlist"), (snapshot) => {
      if(snapshot.hasChildren){
        const data = snapshot.val()
        if(data){
            for(var key in data){
                onValue(ref(db, "Users/userlist/"+key), (snapshot) => {
                    const data = snapshot.val()

                    // for(var key in data){

                    //     console.log(list.length)

                    //     const a = [data['user'], data['email']]
                    //     setList(prev => [...prev, a])
                    // }

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
        for(var i = 1; i < list.length; i+=2){
            listShow[j]=[list[i-1],list[i]]
            j++
        }

        tempList = listShow
        for(var i = tempList.length-1; i >= 0; i--){
            if((""+tempList[i][1]).includes(e.target.value)){
                const a = tempList[i][1]
                setListDisplay(prev => [...(prev), a])
            }
        }
    }
    }

  return (
    <div>
        {listDisplay.map((item) => {
            
            return(
                <NameNode Name={item}></NameNode>
            )
        })}

    <header className="Search-header">
        <input className="searchField" placeholder='Search...' onChange={changeList}/>
    </header>
    </div>
  )
}

export default Search