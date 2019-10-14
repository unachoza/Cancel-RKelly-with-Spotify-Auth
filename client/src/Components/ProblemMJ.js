import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify()

class ProblemMJ extends Component{
   removeSongs(playlistID, uri) { 

        spotifyWebApi.removeTracksFromPlaylist( playlistID, [{ "uri": uri[this.props.MJindexies]}])
    }
    

    render() {
        const {mJVerdict, playlistId, uri, i, MJindexies} = this.props
        console.log('arrived at this page', mJVerdict, "here are the indexxx", MJindexies)

              let songs = mJVerdict.map((song, i) => {
                return <div key={i}>{song}<br></br><span>Michael Jackson</span> </div> 
             })
        return (
            <div style={{ color: "darkred", fontSize: "20px", fontWeight: "300", display: "inline-block" }}>
                {songs}
<button className="remove-button"onClick={(e) => this.removeSongs(playlistId, uri)}>Remove</button>

            </div>
        )
    }
}
export default ProblemMJ
