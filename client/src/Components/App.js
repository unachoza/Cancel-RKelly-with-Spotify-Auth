import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify()

class App extends Component {
    constructor() {
        super()
        const params = this.getHashParams()
        const token = params.access_token
        this.state = {
            loggedIn: token ? true : false,
            playlistNames: ""
        }
        if (token) {
            console.log('got access token', token)
            spotifyWebApi.setAccessToken(token)
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
    
    getPlaylists() {
        spotifyWebApi.getUserPlaylists("1224023576", {limit: 50})
            .then((response) => {
                console.log("playing", response.items)
                this.setState({ playlistNames: response.items })
            })
    }
    listTracksFromPlaylists() {
        spotifyWebApi.getPlaylistTracks("5eQkKKafKAWZ02UEzOfcgo")
        .then((response) => console.log(response) )
    }
   
    findRKelly() {
        spotifyWebApi.search("r kelly", ["artist"])
            .then((response) => {
            console.log("this is the response ", response)
        })
    }
    // rkelly id : "2mxe0TnaNL039ysAj51xPQ"

        
    render() {
        return (
            <div className="home">
                <h1>Your Spotify Needs Help</h1>
                {!this.state.loggedIn ? <a href="http://localhost:8888">
                    <button>Login to Spotify</button>
                </a> : ""}
                
                <div>
                    {this.state.loggedIn &&
                        <button onClick={() => this.getPlaylists()}>Check Your Playlists</button>}
                </div>  
                {/* {this.state.playlistNames? <div>These are All Your Playlists: {this.state.playlistNames} </div>  : ""} */}
                {/* <div>Your Playlists : {this.state.playlistNames}</div> */}
            {this.state.playlistNames ? this.state.playlistNames.map((title, i) => <div key={i} style={{display: "inline-block", padding: "14px", border: "1px solid black", borderRadius: "4px", backgroundColor: "magenta", color: "white"}}>{title.name}</div>) : ""}
                 
        </div>
         )
    }
    
}

export default App