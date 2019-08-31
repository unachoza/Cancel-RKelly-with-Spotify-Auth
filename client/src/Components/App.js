import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'
import PlaylistList from './PlaylistsList';

const spotifyWebApi = new Spotify()

class App extends Component {
    constructor() {
        super()
        const params = this.getHashParams()
        const token = params.access_token
        this.state = {
            loggedIn: token ? true : false,
            playlistNames: "",
            trackNamesArr: [],
            user: {
                name: "", 
                imageUrl: ""
            }
        }
        this.listTracksFromPlaylists = this.listTracksFromPlaylists.bind(this)
        if (token) {
            console.log('got access token', token)
            spotifyWebApi.setAccessToken(token)
            this.getUserInfo()

        }
        console.log(this.state)
    }
    

    getHashParams() {
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        console.log('got hash params', hashParams)
        return hashParams;
    }
    getUserInfo() {
        spotifyWebApi.getMe()
            .then(response => {
                this.setState({
                    name: response.display_name,
                    imageUrl: response.images.url
                })
                console.log("this response", response, "and state", this.state)
            })
    }
    
    getPlaylists() {
        spotifyWebApi.getUserPlaylists("1224023576", {limit: 2, offset: 70})
            .then((response) => {
                console.log("playing", response.items)
                this.setState({ playlistNames: response.items })
                console.log(this.state.playlistNames)
            })
    }
    listTracksFromPlaylists(trackID) {
        //like a g6 playlist 27 tracks, 5th from the bottom is ignition
        // listTracksFromPlaylistsspotifyWebApi.getPlaylistTracks("10ts9epZnIHySy31AGHfmP")'
        console.log(trackID)
        spotifyWebApi.getPlaylistTracks(trackID)
            .then(response => this.setState({ trackNamesArr: response.items })
                // .then(console.log(response.items))
            )
        .then(this.state.trackNamesArr && 
           this.state.trackNamesArr.map((trackName, i) => {
               console.log(trackName.track)
            //  return <div key={i}>{trackName.track.name}</div>
            }))
        
    }
   
    findRKelly() {
    // rkelly id : "2mxe0TnaNL039ysAj51xPQ"
        spotifyWebApi.search("r kelly", ["artist"])
            .then((response) => {
            console.log("this is the response ", response)
        })
    }

        
    render() {
        return (
            <div className="home">
                <h1>Your Spotify Music Needs Help</h1>
                {!this.state.loggedIn ?
                    <a href="http://localhost:8888">
                        <button>Login to Spotify</button>
                    </a>
                    : <button onClick={() => this.getPlaylists()}>Check Your Playlists</button>}
                
                {/* {this.state.playlistNames && this.state.playlistNames.map(playlist => (
                    this.listTracksFromPlaylists(playlist.id)))} */}
                {this.state.playlistNames &&
                    <PlaylistList
                    usersPlaylists={this.state.playlistNames}
                    tracksObject={this.state.trackNamesArr}
                    trackList={this.listTracksFromPlaylists}
                    />}
                {/* {this.state.playlistNames && this.state.playlistNames.map((title, i) => <div key={i} style={{ display: "inline-block", padding: "14px", border: "1px solid black", borderRadius: "4px", backgroundColor: "magenta", color: "white" }}>{title.name}</div>)} */}
            </div>
        )
    }
         
    
    
}

export default App