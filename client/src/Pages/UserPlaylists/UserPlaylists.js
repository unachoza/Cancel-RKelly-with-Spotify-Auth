import React from 'react';
import 'Pages/UserPlaylists/UserPlaylists.css';

const UserPlaylists = ({ offsetNum, getPlaylists }) => {
  return (
    <div>
      <button className={offsetNum > 0 ? 'hide' : 'showIt'} onClick={() => getPlaylists()}>
        Back 10 PLAYLISTS
      </button>
      <button className={offsetNum > 0 ? 'hide' : 'showIt'} onClick={() => getPlaylists()}>
        Next 10 PLAYLISTS
      </button>
    </div>
  );
};
export default UserPlaylists;
