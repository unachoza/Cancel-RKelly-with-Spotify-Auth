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
    
    getNowPlaying() {
        spotifyWebApi.getUserPlaylists("1224023576")
            .then((response) => {
                console.log("playing", response.items)
                this.setState({ playlistNames: response.items })
            })
    }
    // mapit() {
    //     this.state.playlistNames.map((names, i) => {
    //         // console.log(names[i].name)
    //         return <div key={i}>{names}</div>
    //     })
    // }

        
    render() {
        return (
            <div className="home">
                <h1>Your Spotify Needs Help</h1>
                <a href="http://localhost:8888">
                    <button>Login to Spotify</button>
                </a>
                <div>
                    {this.state.loggedIn &&
                        <button onClick={() => this.getNowPlaying()}>Check What's Playing</button>}
                </div>  
                {/* {this.state.playlistNames? <div>These are All Your Playlists: {this.state.playlistNames} </div>  : ""} */}
                {/* <div>Your Playlists : {this.state.playlistNames}</div> */}
            {this.state.playlistNames ? this.state.playlistNames.map(title => <div>{title.name}</div>) : ""}
                 
        </div>
         )
    }
    
}

export default App