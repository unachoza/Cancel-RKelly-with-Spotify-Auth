import React from 'react'
import '../App.css'

const PlaylistSingle = ({ playlistInfo, tracksObject, trackList, trackNames, showSongs}) => {
     console.log('hit playListSingle Componenet')
    return (
        <div className="playlist-container"
            style={{ display: "inline-block", padding: "14px", border: "1px solid black", borderRadius: "4px", backgroundColor: "magenta", color: "white" }}>
            <div className="playlist-title">
                {playlistInfo.name} 
                {trackList(playlistInfo.id)}
                <br></br>
                <button onClick={() => showSongs()}>Show Songs</button>
            </div>
        </div>      
    )
}

export default PlaylistSingle


