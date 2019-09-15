import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify()

class ProblemCB extends Component{
   removeSongs(playlistID, uri, i) { 
        console.log('clicked' )
        
        spotifyWebApi.removeTracksFromPlaylist( playlistID, {
            "tracks":
                [{ "uri": uri }]
        })
        console.log('removed' )
    }
    
    render() {
        const { chrisBrownVerdict, uri, i, playlistId } = this.props
        console.log("these are uris" , uri, "and i", i,  "and plahlist ides" ,playlistId)
        
    console.log(this.props)
              let songs = chrisBrownVerdict.map((song, i) => {
                return <div key={i}>{song} </div> 
             })
        return (
            <div style={{ color: "darkred", fontSize: "20px", fontWeight: "300" }}>
                {songs}
<button onClick={(e) => this.removeSongs(playlistId, uri)}>Remove Song</button>

            </div>
        )
    }
}
export default ProblemCB