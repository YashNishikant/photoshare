import React from 'react'

export default class Post extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      Author: props.name,
      Message: props.message,
      Caption: props.caption
    }
  }

  render(){
    return(
      <div>
          <h1>Author: {this.state.Author}</h1>
          <h1>Message: {this.state.MSG}</h1>
          <h1>Caption: {this.state.Caption}</h1>
      </div>
    );
  }

}