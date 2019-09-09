import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'
import Songs from './Songs'

const spotifyWebApi = new Spotify()

//({ playlistInfo, tracksObject, trackList, trackNames, showSongs })
class PlaylistSingle extends Component {
    constructor() {
        super()
        this.state = {
            items: [],
            tracks: [],
            artists: [],
            rKellyVerdict: [],
            chrisBrownVerdict: [],
            trackobj: []
        }
    }
    
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
                    console.log(item)
                    trackNames.push(item)
                    this.setState({ items: trackNames })
                    console.log(this.state.items)
                })
                response.items.map(item => {
                    artistObjArr.push(item.track.artists)
                    return artistObjArr
                })
                response.items.map(item => {
                    trackobj.push(item.track)
                    this.setState({trackobj: trackobj})
                })
                artistObjArr.map((artist) => {
                    artistsNamesArr.push(artist[0].name)
                    this.setState({ artists: artistsNamesArr})
                })
                
                const rKellyVerdict = artistsNamesArr.indexOf("R. Kelly")
                if (rKellyVerdict >= 0) {
                    console.log("Rkelly song here", trackNames[rKellyVerdict])
                    this.setState({ rKellyVerdict: rKellyVerdict })
                }
                const chrisBrownVerdict = artistsNamesArr.indexOf("Chris Brown")
                if (chrisBrownVerdict >= 0) {
                    // console.log("Chris Brown song here", trackNames[chrisBrownVerdict])
                    // bummer = `Chris Brown song here" ${trackNames[chrisBrownVerdict]}`
                    this.setState({ chrisBrownVerdict: chrisBrownVerdict })
                    // console.log(bummer)
                    // return bummer
                    
                    // return <div className="verdict">Chris Brown Song: {trackNames[chrisBrownVerdict]}</div>
                }

            })
        return <div className={this.state.chrisBrownVerdict ? "verdict": "none"}>Chris</div>
    }

    render() {
        
        console.log('hit playListSingle Componenet', this.bummer)
        return (
            <div className="playlist-container"
                style={{ display: "inline-block", padding: "14px", border: "1px solid black", borderRadius: "4px", backgroundColor: "magenta", color: "white" }}>
                <div className="playlist-title">
                    {this.bummer}
                    {this.props.playlistInfo.name}
                    <br></br>
                    <button onClick={() => this.listTracksFromPlaylists(this.props.playlistInfo.id)}>Show Songs</button>
                    {this.state.items &&
                        <Songs  items={this.state.items}/>}
                </div>
            </div>
        )
    }
}
export default PlaylistSingle

