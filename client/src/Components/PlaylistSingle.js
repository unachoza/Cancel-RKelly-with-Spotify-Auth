import React from 'react'
import '../App.css'

const PlaylistSingle = ({ playlistInfo, tracksObject, trackList }) => {
    console.log('hit it',playlistInfo)
    // const {{trackList}} = this.props
        

    return (
        

        <div className="playlist-container"
            style={{ display: "inline-block", padding: "14px", border: "1px solid black", borderRadius: "4px", backgroundColor: "magenta", color: "white" }}>
            <div className="playlist-title">
                {playlistInfo.name}
                
                <button onClick={trackList(playlistInfo.id)}>Button</button>
                
            </div>
          </div>      
            
        
    )
                
}

export default PlaylistSingle


