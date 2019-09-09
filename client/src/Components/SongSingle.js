import React, {Component} from 'react'
import '../App.css'

// ({ track, chrisBrownVerdict }) 
// class SongSingle extends Component {
const SongSingle = ({ item }) => {
    
        return (
            <div>
              
                <div className="song-title" style={{ textAlign: "left" , fontSize: "18px"}}> <span style={{fontWeight: "bold"}}>{item.track.name.toUpperCase()} </span>by {item.track.artists[0].name}</div>
                

            </div>
        )
    
    }



export default SongSingle