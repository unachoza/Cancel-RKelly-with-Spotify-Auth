import React from 'react';
import 'Components/PlaylistList/PlaylistList.css';
import PlaylistSingle from 'Components/PlaylistSingle/PlaylistSingle';

export const PlaylistList = ({ usersPlaylists, playlistOwnerId, CurrentUserid, home }) => {
  return (
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
};
export default PlaylistList;
