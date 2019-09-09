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
            trackNames: [],
            // artistObjArr: [],
            artistsNamesArr: []
            
        }
    }

    //getting list of tracks in User's Playlists 
    listTracksFromPlaylists(trackID) {
        spotifyWebApi.getPlaylistTracks(trackID)
            .then((response) => {
                //saving variables of interested data points in response obj
                let trackNames = []
                let artistObjArr = []
                let artistsNamesArr = []
                let items = []

                response.items.map((item) => {
                    items.push(item)
                    this.setState({ items })
                    
                })
                response.items.map((item) => {
                    trackNames.push(item.name)
                    this.setState({ trackNames })
                })
                
                artistObjArr.map((artist) => {
                    artistsNamesArr.push(artist[0].name)
                    this.setState({ artistsNamesArr })
                })
                
            this.itsProblematic()
                return trackNames, artistObjArr, artistsNamesArr
            })
    
    }
    itsProblematic() {
        const rKellyVerdict = this.state.artistsNamesArr.indexOf("R. Kelly")
        if (rKellyVerdict >= 0) {
            console('here')
            console.log("Rkelly song here", this.state.trackNames[rKellyVerdict])
                     
        }
        console.log(rKellyVerdict)
        const chrisBrownVerdict = this.state.artistsNamesArr.indexOf("Chris Brown")
        if (chrisBrownVerdict >= 0) {
            console.log("Chris Brown song here", this.state.trackNames[chrisBrownVerdict])
                    

        }
        console.log(chrisBrownVerdict)
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

