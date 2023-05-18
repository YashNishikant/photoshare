import React from "react";
import {ref,get,set,update,remove,child} from "firebase/database"
import {db} from '../firebaseconfig'
import {auth} from '../firebaseconfig'

export class crudops extends React.Component{

    constructor(props){
        super(props)
        this.state={
            username:'',
        }
    }
}