import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'
import PlaylistList from './PlaylistsList'

const spotifyWebApi = new Spotify()

class ProblemCB extends Component{

    

    // callback?:
    // removeTracksFromPlaylist(playlistId: string, uris: Object[], callback?:
    render() {

        return (
            <div style={{ color: "darkred", fontSize: "20px", fontWeight: "300" }}>
                  <hr></hr>
                <div>This is a problem: {this.props.chrisBrownVerdict}</div> 
                <hr></hr>

            </div>
        )
    }
}
export default ProblemCB