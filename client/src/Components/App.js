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
            nowPlaying: {
                name: "", 
            }
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
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
       console.log('got hash params', hashParams)
          return hashParams;
   }
    
    getNowPlaying() {
        spotifyWebApi.getUserPlaylists("1224023576")
            .then((response) => {
            console.log("playing", response.items)
            this.setState({
                nowPlaying: {
                    name: response.items[0].name,
                }
            })
        })
    }
        
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
                {this.state.nowPlaying.name? <div>These are All Your Playlists: {this.state.nowPlaying.name} </div>  : ""}
            {/* <div>Your Playlists : {this.state.nowPlaying.name}</div> */}
                 
        </div>
         )
    }
    
}

export default App