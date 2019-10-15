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
    const {CBindexies} = this.props
    if(CBindexies.length >1 ){
      const multipleSongs = CBindexies.map(index => uri[index])
    multipleSongs.map(index => spotifyWebApi.removeTracksFromPlaylist( playlistID, [{ "uri": index}]))
  }
  spotifyWebApi.removeTracksFromPlaylist( playlistID, [{ "uri": uri[this.props.CBindexies] }])
  }
    
    render() {
        const { chrisBrownVerdict, uri, playlistId } = this.props
        
              let songs = chrisBrownVerdict.map((song, i) => {
                return <div style={{textAlign: "left"}} key={i}>{song} <br></br><span style={{color: 'white'}}>Chris Brown</span> </div> 
             })
        return (
            <div style={{ fontSize: "20px", fontWeight: "300" }}>
                {songs}
<button className="remove-button"onClick={(e) => this.removeSongs(playlistId, uri)}>Remove</button>
            </div>
        )
    }
}
export default ProblemCB