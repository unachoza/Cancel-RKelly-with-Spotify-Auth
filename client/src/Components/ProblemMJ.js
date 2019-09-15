import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify()

class ProblemMJ extends Component{
   removeSongs(playlistID, uri, i) { 
        console.log('clicked' )
        
        spotifyWebApi.removeTracksFromPlaylist( playlistID, {
            "tracks":
                { "uri": uri }
        })
        console.log('removed' )
    }
    

    render() {
        const {mJVerdict, playlistId, uri, i} = this.props
              let songs = mJVerdict.map((song, i) => {
                return <div key={i}>{song} </div> 
             })
        return (
            <div style={{ color: "darkred", fontSize: "20px", fontWeight: "300", display: "inline-block" }}>
                {songs}
<button onClick={(e) => this.removeSongs(playlistId, uri, i)}>Remove Song</button>

            </div>
        )
    }
}
export default ProblemMJ