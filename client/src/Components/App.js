import React, {Component} from 'react'
import '../App.css'

class App extends Component {
    constructor() {
        super()
        const pms = this.getHashParams()
        this.state = {
            loggedIn: params.access_token ? true : false,
            nowPlaying: {
                name: "Not Checked", 
                top: ''
            }
        }
    }
    

    getHashParams() {
        console.log('something')
          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams;
    }
        
    render() {
        return (
            <div className="home">
                <h1>Arianna's App</h1>
            <h1>Log in to Spotify</h1>
            <a href="http://localhost:8888">
                <button>Login</button>
            </a>
            <div>Now Playing {this.state.nowPlaying.name}</div>
            <img src={this.state.nowPlaying.image} style={{ width: 100 }}/>
        </div>
         )
    }
    
}

export default App