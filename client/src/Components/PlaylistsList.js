import React from 'react'
import '../App.css'
import PlaylistSingle from './PlaylistSingle'

export const PlaylistList = ({ usersPlaylists, tracksObject, trackList, trackNames, showSongs }) => {
    return (
        (
            <div>
        {
                    usersPlaylists.map((title, i) => (
                
            <PlaylistSingle key={i} playlistInfo={title} tracksObject={tracksObject} 
                    trackList={trackList} trackNames={trackNames} showSongs={showSongs}
        />
            ))}
</div>
)
    )
}
export default PlaylistList