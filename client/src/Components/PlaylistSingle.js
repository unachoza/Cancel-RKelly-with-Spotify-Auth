import React from 'react'
import '../App.css'
import Songs from './Songs'

const PlaylistSingle = ({ playlistInfo, tracksObject, trackList, names }) => {
    // console.log('hit playListSingle Componenet")
    return (
        <div className="playlist-container"
            style={{ display: "inline-block", padding: "14px", border: "1px solid black", borderRadius: "4px", backgroundColor: "magenta", color: "white" }}>
            <div className="playlist-title">
                {playlistInfo.name} 
                {trackList(playlistInfo.id)}
                {/* <button onclick={renderSongs()}>Show Songs</button> */}
                {names &&
                    <Songs names={names} />
                }
            </div>
        </div>      
    )
}

export default PlaylistSingle


