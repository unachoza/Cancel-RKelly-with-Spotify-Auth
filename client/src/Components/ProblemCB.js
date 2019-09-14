import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'
import PlaylistList from './PlaylistsList'

const spotifyWebApi = new Spotify()

class ProblemCB extends Component{

    
    render() {
    console.log(this.props.removeSongs)
              let songs = this.props.chrisBrownVerdict.map((song, i) => {
                return <div key={i}>{song} </div> 
             })
        return (
            <div style={{ color: "darkred", fontSize: "20px", fontWeight: "300" }}>
                {songs}
            </div>
        )
    }
}
export default ProblemCB