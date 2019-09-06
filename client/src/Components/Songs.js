import React from 'react'
import '../App.css'

export const Songs = ({ names }) => {
    console.log("Hit songs component")
    return (
              <div> hey
    {names.map(name => <div>{name}</div>)}

    </div>   
            )
    
}


export default Songs