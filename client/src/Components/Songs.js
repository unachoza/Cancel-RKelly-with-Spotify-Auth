import React from 'react'
import '../App.css'
import SongSingle from './SongSingle'



const Songs = ({ tracks, artists, rKellyVerdict, chrisBrownVerdict, trackobj }) => {
        return (
                <div>
                        {trackobj.map((track, i) => <SongSingle track={track} key={i} />)}
               
                </div>)
                        
}

export default Songs
