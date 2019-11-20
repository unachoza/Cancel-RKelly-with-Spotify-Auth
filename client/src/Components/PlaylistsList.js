import React from 'react'
import '../App.css'
import PlaylistSingle from './PlaylistSingle'

export const PlaylistList = ({ usersPlaylists, playlistOwnerId, CurrentUserid }) => {
    console.log(usersPlaylists)
    return (
        ( <div className="all-playlists">
        {usersPlaylists.map((title, i) => (
            <PlaylistSingle key={i} playlistInfo={title} playlistOwnerId={playlistOwnerId} CurrentUserid={CurrentUserid}/>))}
    </div>)
    )
}
export default PlaylistList