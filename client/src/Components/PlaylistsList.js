import React from 'react'
import '../App.css'
import PlaylistSingle from './PlaylistSingle'

export const PlaylistList = ({ usersPlaylists, tracksObject, trackList}) => (

    <div>
        {
            usersPlaylists.map((title, i) => (
            <PlaylistSingle key={i} playlistInfo={title} tracksObject={tracksObject} 
                    trackList={trackList}
        />
    ))}
</div>
)
export default PlaylistList