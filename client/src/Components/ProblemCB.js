import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify()

class ProblemCB extends Component{
   onSuccess() {
       return(
           <div>

           </div>
       )
   } 
   removeSongs(playlistID, uri) { 
        spotifyWebApi.removeTracksFromPlaylist( playlistID, [ { "uri": uri[1] }]  )
        
        }
    
    render() {
        const { chrisBrownVerdict, uri, i, playlistId } = this.props
        console.log("these are uris" , uri, "and i", i,  "and plahlist ides" ,playlistId)
        
    console.log(this.props)
              let songs = chrisBrownVerdict.map((song, i) => {
                return <div key={i}>{song}<br></br><span>Chris Brown</span> </div> 
             })
        return (
            <div style={{ color: "darkred", fontSize: "20px", fontWeight: "300" }}>
                {songs}
<button className="remove-button"onClick={(e) => this.removeSongs(playlistId, uri)}>Remove</button>
            </div>
        )
    }
}
export default ProblemCB