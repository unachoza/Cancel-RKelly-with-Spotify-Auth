import React from 'react'
import '../App.css'
import PlaylistSingle from './PlaylistSingle'

export const PlaylistList = ({ usersPlaylists, tracksObject, trackList, trackNames, showSongs }) => {
    console.log('hit playlistList Component', usersPlaylists)
    return (
        (

            <div>
                {trackNames && trackNames.map(track =>  <div>{track}</div>)}
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