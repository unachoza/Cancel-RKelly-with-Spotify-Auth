import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'
import PlaylistList from './PlaylistsList';
import Songs from './Songs'

const   spotifyWebApi = new Spotify()

class App extends Component {
    constructor() {
        super()
        const params = this.getHashParams()
        const token = params.access_token
        this.state = {
            loggedIn: token ? true : false,
            playlistNames: "",
            trackNamesArr: [],
            
                userName: "", 
                userImageUrl: "", 
                userId: ""
            
        }
        if (token) {
            spotifyWebApi.setAccessToken(token)
            this.getUserInfo()

        }
    }
    

    getHashParams() {
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }
    getUserInfo() {
        spotifyWebApi.getMe()
            .then(response => {
                console.log(response.id)
                this.setState({
                    name: response.display_name,
                    imageUrl: response.images.url,
                    userId: response.id

                })
            })
        console.log(this.state)
                return this.state.userId
    }
    //getting list of User's Playlists: limit 50 
    getPlaylists() {
        spotifyWebApi.getUserPlaylists(`${this.getUserInfo()}`,{ limit: 1, offset: 0 })
            .then((response) => {
                this.setState({ playlistNames: response.items })
                // console.log(this.state.playlistNames)
            })
    }
  

   
    findRKelly() {
    // rkelly id : "2mxe0TnaNL039ysAj51xPQ"
        spotifyWebApi.search("r kelly", ["artist"])
            .then((response) => {
            console.log("this is the response ", response)
        })
    }
    /* need following fuctions:
       renderSongs()
       highlightRkellySongs()
       highlightChrisBrownSongs()
       removeFromSelectedSongs()
       shareThisAppViaText()
       logOutOfSpoitify()

    */
    
    /* Need following Components/ UI/UX
    asthetically pleasing UI
    buttons to do remaining functions
    messages congradulating users of belieiving women, 
    counter of how many songs removed from how many users 
    resources 
    send Cancel R Kelly App to a friend via text 

     */

     /* Other artists to cancel 
     OFSETT
     XXX somone
     Woody Allen
     */

        
    render() {
        return (
            <div className="home">
                <h1>Your Spotify Music Needs Help</h1>
                {!this.state.loggedIn ?
                    <a href="http://localhost:8888">
                        <button>Login Spotify</button>
                    </a>
                    : <button onClick={() => this.getPlaylists()}>Check Your Playlists</button>}
                
                {this.state.playlistNames && this.state.trackNamesArr &&
                    <PlaylistList
                    usersPlaylists={this.state.playlistNames}
                    tracksObject={this.state.trackNamesArr}
                    trackList={this.listTracksFromPlaylists}
                    trackNames={this.trackNames}
                    showSongs={this.showSongs}
                    />}
                {this.tracknames && 
            <Songs trackNames={this.trackNames}/>}
            </div>
        )
    }
         
    
    
}

export default App