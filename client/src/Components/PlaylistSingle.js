import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'
import Songs from './Songs'
import SongsToRemove from './SongsToRemove'

const spotifyWebApi = new Spotify()

//({ playlistInfo, tracksObject, trackList, trackNames, showSongs })
class PlaylistSingle extends Component {
    constructor() {
        super()
        this.state = {
            items: [],
            rKellyVerdict: [],
            chrisBrownVerdict: [],
            
        }
    }

    //getting list of tracks in User's Playlists 
    listTracksFromPlaylists(trackID) {
        console.log('checking Songs in playlist')
        spotifyWebApi.getPlaylistTracks(trackID)
            .then((response) => {
                console.log(response.items)
                //saving variables of interested data points in response obj
                let trackNames = []
                let artistObjArr = []
                let artistsNamesArr = []
                let trackobj = []

                response.items.map((item) => {
                    trackNames.push(item)
                    this.setState({ items: trackNames })
                    
                })
                 response.items.map((item) => {
                    trackNames.push(item.name)
                })
                
                artistObjArr.map((artist) => {
                    artistsNamesArr.push(artist[0].name)
                })
                
                const rKellyVerdict = artistsNamesArr.indexOf("R. Kelly")
                if (rKellyVerdict >= 0) {
                    console.log("Rkelly song here", trackNames[rKellyVerdict])
                     
                }
                const chrisBrownVerdict = artistsNamesArr.indexOf("Chris Brown")
                if (chrisBrownVerdict >= 0) {
                    console.log("Chris Brown song here", trackNames[chrisBrownVerdict])
                    
                } return rKellyVerdict

            })
        this.findProblematicSongs()
    }
    findProblematicSongs() {
        console.log(this.listTracksFromPlaylists())
        
    }

    render() {
        
        return (
            <div className="playlist-container"
                style={{ display: "inline-block", padding: "14px", border: "1px solid black", borderRadius: "4px", backgroundColor: "magenta", color: "white" }}>
                <div className="playlist-title">
                    {this.props.playlistInfo.name}
                    <br></br>
                    <button onClick={() => this.listTracksFromPlaylists(this.props.playlistInfo.id)}>Show Songs</button>
                </div>
                    {this.state.items &&
                    <Songs items={this.state.items} />}
                <SongsToRemove />
            </div>
        )
    }
}
export default PlaylistSingle

