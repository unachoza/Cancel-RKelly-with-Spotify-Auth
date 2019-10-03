import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify()

class ProblemMJ extends Component{
   removeSongs(playlistID, uri) { 
        console.log('clicked' )
        console.log(uri)
        spotifyWebApi.removeTracksFromPlaylist( playlistID, [{ "uri": uri[0]}])
        console.log(uri[0])
        console.log('removed' )}
    

    render() {
        const {mJVerdict, playlistId, uri, i} = this.props
              let songs = mJVerdict.map((song, i) => {
                return <div key={i}>{song}<br></br><span>Michael Jackson</span> </div> 
             })
        return (
            <div style={{ color: "darkred", fontSize: "20px", fontWeight: "300", display: "inline-block" }}>
                {songs}
<button className="remove-button"onClick={(e) => this.removeSongs(playlistId, uri, i)}>Remove</button>

            </div>
        )
    }
}
export default ProblemMJ