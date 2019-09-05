import React from 'react'
import '../App.css'

const PlaylistSingle = ({ playlistInfo, tracksObject, trackList, names }) => {
    console.log('hit it',tracksObject)
   console.log(playlistInfo)
        

    return (
        

        <div className="playlist-container"
            style={{ display: "inline-block", padding: "14px", border: "1px solid black", borderRadius: "4px", backgroundColor: "magenta", color: "white" }}>
            <div className="playlist-title">
                {playlistInfo.name} 
                {/* {tracksObject.tracks.name && tracksObject.tracks.name } */}
                
                {trackList(playlistInfo.id)}
                {names}
                
            </div>
            <div>{names}</div>
          </div>      
            
        
    )
                
}

export default PlaylistSingle


