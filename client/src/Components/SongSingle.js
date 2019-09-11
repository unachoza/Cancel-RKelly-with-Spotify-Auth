import React from 'react'
import '../App.css'

const SongSingle = ({ item }) => {
    
        return (
            <div>
              
                <div className="song-title" style={{ textAlign: "left" , fontSize: "20px"}}> <span style={{fontWeight: "bold"}}>{item.track.name.toUpperCase()} </span>by {item.track.artists[0].name}</div>
                

            </div>
        )
    
    }



export default SongSingle
