import React, {Component} from 'react'
import '../App.css'
import SongSingle from './SongSingle'



const Songs = ({ items}) => {
console.log(items)
        return (
                <div>
                        {items.map(item => <SongSingle item={item} />)}
               
                </div>)
                        
}

export default Songs
