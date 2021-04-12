import React from 'react';
import 'Components/ModalSongs/ModalSongs.css';
import SongSingle from 'Components/SongSingle/SongSingle';

const ModalSongs = ({ items, showSongs }) => {
  return (
    <div className={showSongs ? 'songs-in-playlist-container-closed' : 'modal-container'}>
      <div
        className={showSongs ? 'songs-in-playlist-container-closed' : 'songs-in-playlist-container-open  show-modal'}
      >
        {items.map((item, i) => (
          <SongSingle item={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default ModalSongs;
