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
            user: {
                name: "", 
                imageUrl: ""
            }
        }
        this.listTracksFromPlaylists = this.listTracksFromPlaylists.bind(this)
        this.renderSongs = this.renderSongs.bind(this)
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
                this.setState({
                    name: response.display_name,
                    imageUrl: response.images.url
                })
            })
    }
    //getting list of User's Playlists: limit 50 
    getPlaylists() {
        spotifyWebApi.getUserPlaylists("1224023576", {limit: 50, offset: 50})
            .then((response) => {
                this.setState({ playlistNames: response.items })
                // console.log(this.state.playlistNames)
            })
    }
    //getting list of tracks in User's Playlists 
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
                    debugger
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
        trackNames.map(track => <div>{track}</div>)
                // this.renderVertics(this.rKellyVerdict, this.chrisBrownVerdict)
            })
    }
    // renderVertics(rKellyVerdict, chrisBrownVerdict) {
    //     console.log('these vertics', rKellyVerdict, chrisBrownVerdict)
    // }
    renderSongs(trackNames) {
        console.log('please render the songs', trackNames)
        console.log(typeof trackNames)
    }
    // <Songs key={i} trackNames={this.trackNames} />
   
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
                        <button>Login to Spotify</button>
                    </a>
                    : <button onClick={() => this.getPlaylists()}>Check Your Playlists</button>}
                
                {this.state.playlistNames && this.state.trackNamesArr &&
                    <PlaylistList
                    usersPlaylists={this.state.playlistNames}
                    tracksObject={this.state.trackNamesArr}
                    trackList={this.listTracksFromPlaylists}
                    trackNames={this.trackNames}
                    renderSongs={this.renderSongs}
                    />}
            </div>
        )
    }
         
    
    
}

export default App