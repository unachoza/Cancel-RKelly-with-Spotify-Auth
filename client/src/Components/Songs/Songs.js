import React from 'react';
import 'Components/Songs/Songs.css';
import SongSingle from 'Components/SongSingle/SongSingle';

const Songs = ({ items, showSongs }) => {
  return (
    <div className={showSongs ? 'songs-in-playlist-container-closed' : 'songs-in-playlist-container-open'}>
      {items.map((item, i) => (
        <SongSingle item={item} key={i} />
      ))}
    </div>
  );
};

export default Songs;
