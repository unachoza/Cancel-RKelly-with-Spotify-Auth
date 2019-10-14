import React from 'react'
import '../App.css'
import PlaylistSingle from './PlaylistSingle'

export const PlaylistList = ({ usersPlaylists }) => {
    return (
        ( <div className="all-playlists">
        {usersPlaylists.map((title, i) => (
            <PlaylistSingle key={i} playlistInfo={title} />))}
    </div>)
    )
}
export default PlaylistList