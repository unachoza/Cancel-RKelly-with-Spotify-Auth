import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify()

class ProblemMJ extends Component{
    removeSongs(playlistID, uri) { 
        const {MJindexies} = this.props
        if(MJindexies.length >1 ){
          const multipleSongs = MJindexies.map(index => uri[index])
        multipleSongs.map(index => spotifyWebApi.removeTracksFromPlaylist( playlistID, [{ "uri": index}])
        )
      }
      spotifyWebApi.removeTracksFromPlaylist( playlistID, [{ "uri": uri[this.props.RKindexies] }])
      }
    

    render() {
        const {mJVerdict, playlistId, uri, MJindexies} = this.props
        console.log('arrived at this page', mJVerdict, "here are the indexxx", MJindexies)

              let songs = mJVerdict.map((song, i) => {
                return <div style={{textAlign: "left"}} key={i}>{song} <br></br><span style={{color: 'white'}}>Michael Jackson</span> </div> 
             })
        return (
            <div style={{ fontSize: "20px", fontWeight: "300", display: "inline-block" }}>
                {songs}
<button className="remove-button"onClick={(e) => this.removeSongs(playlistId, uri)}>Remove</button>

            </div>
        )
    }
}
export default ProblemMJ
