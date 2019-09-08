import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'
import SongSingle from './SongSingle'
import Songs from './Songs'

const spotifyWebApi = new Spotify()

//({ playlistInfo, tracksObject, trackList, trackNames, showSongs })
class PlaylistSingle extends Component {
    constructor() {
        super()
        this.state = {
            tracks: [],
            artists: [],
            rKellyVerdict: [],
            chrisBrownVerdict: []
        }
    }
    
    listTracksFromPlaylists(trackID) {
        console.log('checking Songs in playlist')
        spotifyWebApi.getPlaylistTracks(trackID)
            .then((response) => {
                // console.log(response)
                //saving variables of interested data points in response obj
                let trackNames = []
                let artistObjArr = []
                let artistsNamesArr = []

                response.items.map((item) => {
                    trackNames.push(item.track.name)
                    this.setState({
                        tracks: trackNames
                    })
                    return trackNames
                })
                response.items.map(item => {
                    artistObjArr.push(item.track.artists)
                    return artistObjArr
                })
                artistObjArr.map((artist) => {
                    artistsNamesArr.push(artist[0].name)
                    return artistsNamesArr
                })
                const rKellyVerdict = artistsNamesArr.indexOf("R. Kelly")
                if (rKellyVerdict >= 0) {
                    console.log("Rkelly song here", trackNames[rKellyVerdict])
                    return rKellyVerdict
                }
                const chrisBrownVerdict = artistsNamesArr.indexOf("Chris Brown")
                if (chrisBrownVerdict >= 0) {
                    console.log("Chris Brown song here", trackNames[chrisBrownVerdict])
                    return chrisBrownVerdict
                }

            })
    }

    render() {
        console.log('hit playListSingle Componenet')
        return (
            <div className="playlist-container"
                style={{ display: "inline-block", padding: "14px", border: "1px solid black", borderRadius: "4px", backgroundColor: "magenta", color: "white" }}>
                <div className="playlist-title">
                    {this.props.playlistInfo.name}
                    <br></br>
                    <button onClick={() => this.listTracksFromPlaylists(this.props.playlistInfo.id)}>Show Songs</button>
                    {this.state.tracks &&
                        <Songs  tracks={this.state.tracks} />}
                </div>
            </div>
        )
    }
}
export default PlaylistSingle


