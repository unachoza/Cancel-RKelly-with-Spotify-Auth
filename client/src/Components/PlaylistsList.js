import React from 'react'
import '../App.css'
import PlaylistSingle from './PlaylistSingle'
import Songs from './Songs'

export const PlaylistList = ({ usersPlaylists, tracksObject, trackList, names}) => (

    <div>
        {
            usersPlaylists.map((title, i) => (
            <PlaylistSingle key={i} playlistInfo={title} tracksObject={tracksObject} 
                    trackList={trackList} names={names}
        />
            ))}
        {/* {names.map(name => <Songs name={name}/>)} */}
</div>
)
export default PlaylistList