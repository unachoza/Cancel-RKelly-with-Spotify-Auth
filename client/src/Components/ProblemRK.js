import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'
import axios from 'axios'

const spotifyWebApi = new Spotify()

class ProblemRK extends Component{
    constructor(){
        super()
        this.state ={
            deleting: false
        }
    }

      removeSongs(playlistID, uri) { 
          const {iofRKsong, songRouteID} = this.props
       
          console.log(this.props.songRouteID, "how did it go", this.state)
          if(iofRKsong.length >1 ){
            const multipleSongs = iofRKsong.map(index => uri[index])
          multipleSongs.map(index => spotifyWebApi.removeTracksFromPlaylist( playlistID, [{ "uri": index}])
          )

         
        }
        spotifyWebApi.removeTracksFromPlaylist( playlistID, [{ "uri": uri[this.props.iofRKsong] }])
        axios.put(`http://localhost:3001/db/songs/${songRouteID}`, {
            deleted: true
        })
        .then(res => {
            console.log(res.data.data, 'might have delet43ed')
        })
        this.setState({
            deleting: true
        })
        
        }

deleteAnimation = () => {
    return this.state.deleteing ?
 "animated zoomOut"
 : ""
}

    render() {
        const { RKSongTitle, uri, playlistId } = this.props
        const {deleteing } = this.state
        
           let songs = RKSongTitle.map((song, i) => {
          return <div  className={this.deleteAnimation()} style={{textAlign: "left"}} key={i}>{song}  <br></br><span style={{color: 'white'}}>R. Kelly</span></div> 
     })
        return (
            <div className={this.deleteAnimation()} style={{ fontSize: "20px", fontWeight: "300" }}>
                {songs}
<button id="remove-button"  className="animated zoomOut" onClick={(e) => this.removeSongs(playlistId, uri)}>Remove</button>
            </div>
        )
    }
}




export default ProblemRK