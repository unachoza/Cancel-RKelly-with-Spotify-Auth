import React from 'react';
import 'Components/ModalSongs/ModalSongs.css';
import SongSingle from 'Components/SongSingle/SongSingle';

const ModalSongs = ({ items, showSongs }) => {
  return (
    <div className={showSongs ? 'closed-container' : 'songs-container-open'}>
      {items.map((item, i) => (
        <SongSingle item={item} key={i} />
      ))}
    </div>
  );
};

export default ModalSongs;
