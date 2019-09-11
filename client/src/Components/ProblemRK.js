import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify()

class ProblemRK extends Component{


    // removeTracksFromPlaylist(playlistId, uris: Object[]) {

    // }
    // callback?:
    // removeTracksFromPlaylist(playlistId: string, uris: Object[], callback?:
    render() {
        return (
            <div style={{ color: "darkred", fontSize: "20px", fontWeight: "300" }}>
                  <hr></hr>
                <div>This is a problem: {this.props.rKellyVerdict}</div> 
                <hr></hr>

            </div>
        )
    }
}




export default ProblemRK