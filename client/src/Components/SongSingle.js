import React, {Component} from 'react'
import '../App.css'

// ({ track, chrisBrownVerdict }) 
// class SongSingle extends Component {
    const SongSingle = ({track, chris}) =>{
        return (
            <div>
                
                <div className="song-title" style={{ display: "inline-block" }}> Song Title :  {track.name} by : {track.artists[0].name}</div>

            </div>
        )
    
    }



export default SongSingle