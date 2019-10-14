import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify()

class ProblemRK extends Component{
  //this.props.removeSong()
      removeSongs(playlistID, uri, RKindexies) { 
       
        
        spotifyWebApi.removeTracksFromPlaylist( playlistID, [{ "uri": uri[this.props.RKindexies] }])
        }


    render() {
        const { rKellyVerdict, uri, playlistId, RKindexies } = this.props
        console.log("these are uris" , uri, "and plahlist ides" ,playlistId)
        
           let songs = rKellyVerdict.map((song, i) => {
          return <div key={i}>{song} <br></br><span>R. Kelly</span></div> 
     })
        return (
            <div style={{ color: "darkred", fontSize: "20px", fontWeight: "300" }}>
                {songs}
<button className="remove-button"onClick={(e) => this.removeSongs(playlistId, uri)}>Remove</button>
            </div>
        )
    }
}




export default ProblemRK