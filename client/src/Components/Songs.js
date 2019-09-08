import React from 'react'
import '../App.css'

export const Songs = (trackNames) => {
    console.log("Hit songs component")
     const theseSongs = trackNames.map(name => <div>{name}</div>)

    return (
              <div> hey
            {theseSongs}

    </div>   
            )
    
}


export default Songs