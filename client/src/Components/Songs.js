import React from 'react'
import '../App.css'
import SongSingle from './SongSingle'

const Songs = ({ items, showSongs }) => {
  return (
          <div className={!showSongs? "show" : "hide"} style={{width:"400px"}}>
        {items.map((item, i ) => <SongSingle item={item} key={i}/>)}
    </div>)
                        
}

export default Songs

