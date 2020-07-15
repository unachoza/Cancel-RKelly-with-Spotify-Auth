import React from 'react';
import 'App.css';
import PlaylistSingle from 'Components/PlaylistSingle';

export const PlaylistList = ({ usersPlaylists, playlistOwnerId, CurrentUserid, home }) => (
  <div>
    {!home && (
      <div className="all-playlists">
        {usersPlaylists.map((title, i) => (
          <PlaylistSingle
            key={i}
            playlistInfo={title}
            playlistOwnerId={playlistOwnerId}
            CurrentUserid={CurrentUserid}
          />
        ))}
      </div>
    )}
  </div>
);

export default PlaylistList;
