import React from 'react';
import 'Components/SongSingle/SongSingle.css';

const SongSingle = ({ item }) => {
  return (
    <div>
      <div className="song-title" style={{ color: '#a7a19b', fontSize: '16px' }}>
        {' '}
        <span style={{ fontSize: '14px', color: 'white' }}>{item.name} </span>
        {item.artists[0].name}
      </div>
    </div>
  );
};

export default SongSingle;
