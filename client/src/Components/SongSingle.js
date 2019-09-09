import React, {Component} from 'react'
import '../App.css'

// ({ track, chrisBrownVerdict }) 
// class SongSingle extends Component {
const SongSingle = ({ item, chris }) => {
    console.log(item.track.name)
    debugger
        return (
            <div>
                debugger
                <div className="song-title" style={{ display: "inline-block" }}> Song Title :  {item.track.name} by : {item.track.artists[0].name}</div>

            </div>
        )
    
    }



export default SongSingle