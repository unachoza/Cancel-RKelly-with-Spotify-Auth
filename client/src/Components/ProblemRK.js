import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify()

class ProblemRK extends Component{
      removeSongs(playlistID, uri) { 
          const {iofRKsong} = this.props
          if(iofRKsong.length >1 ){
            const multipleSongs = iofRKsong.map(index => uri[index])
          multipleSongs.map(index => spotifyWebApi.removeTracksFromPlaylist( playlistID, [{ "uri": index}])
          )
        }
        spotifyWebApi.removeTracksFromPlaylist( playlistID, [{ "uri": uri[this.props.iofRKsong] }])
        }


    render() {
        const { RKSongTitle, uri, playlistId } = this.props
        
           let songs = RKSongTitle.map((song, i) => {
          return <div style={{textAlign: "left"}} key={i}>{song} <br></br><span style={{color: 'white'}}>R. Kelly</span></div> 
     })
        return (
            <div style={{ fontSize: "20px", fontWeight: "300" }}>
                {songs}
<button className="remove-button"onClick={(e) => this.removeSongs(playlistId, uri)}>Remove</button>
            </div>
        )
    }
}




export default ProblemRK