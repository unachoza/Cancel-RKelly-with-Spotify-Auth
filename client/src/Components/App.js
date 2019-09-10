import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'
import PlaylistList from './PlaylistsList';

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
            offsetNum: 0,
            items: [],
            user: {
                name: "", 
                imageUrl: "",
                id: ""
            }
        }
        // this.listTracksFromPlaylists = this.listTracksFromPlaylists.bind(this)
        // this.listTracksFromPlaylists() = this.listTracksFromPlaylists.bind(this)
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
        console.log(hashParams)
        return hashParams;
    }
    logout(token) {
        console.log('clicked logout')
        token = false
        console.log(token)
    }
    getUserInfo() {
        spotifyWebApi.getMe()
            .then(response => {
                console.log(response)
                this.setState({
                    name: response.display_name,
                    imageUrl: response.images.url, 
                    id: response.id
                    
                })
            })
        
    }
    //getting list of User's Playlists: limit 50 
    
    getPlaylists(){
        this.increaseOffset()
        // {limit: 50, offset: 0}
        spotifyWebApi.getUserPlaylists(this.state.id, {limit: 20, offset: this.state.offsetNum})
           
            .then((response) => {
                console.log(response.items.length)
                this.setState({ playlistNames: response.items })
                // console.log(this.state.playlistNames)
            })
    }
    increaseOffset() {
        this.setState(state => {
            return {
                offsetNum: state.offsetNum + 20
            }
        })
        console.log(this.state)
    }
    //getting list of tracks in User's Playlists 
    // listTracksFromPlaylists(trackID) {
    //     // console.log('checking Songs in playlist')
    //     spotifyWebApi.getPlaylistTracks(trackID)
    //         .then((response) => {
    //             //saving variables of interested data points in response obj
    //             let trackNames = []
    //             let artistObjArr = []
    //             let artistsNamesArr = []
    //             let items = []
              
                
    //       response.items.map((item) => {
    //         trackNames.push(item.track.name)
    //       })
        
    //     response.items.map(item => {
    //         artistObjArr.push(item.track.artists)
    //     })
    //     artistObjArr.map((artist) => {
    //         artistsNamesArr.push(artist[0].name)
    //     })
    //             let mJSong = artistsNamesArr.indexOf("Michael Jackson")
    //             // console.log(trackNames[rKellyVerdict] , "here")
    //     if (mJSong > -1) {
    //         console.log("mJSong song here", trackNames[mJSong])
    //     }
    //         const chrisBrownVerdict = artistsNamesArr.indexOf("Chris Brown")
    //     if (chrisBrownVerdict > -1 ) {
    //         console.log("Chris Brown song here", trackNames[chrisBrownVerdict])
    //     }
    //     const rkelly = artistsNamesArr.indexOf("R. Kelly")
    //     if (rkelly > -1) {
    //         console.log("R. Kelly song here", trackNames[rkelly])
    //     }
    //     return trackNames, artistObjArr, artistsNamesArr
                
    //         })
        
    // }
   
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

        
    render() {
        return (
            <div className="home">
                <h1>Your Spotify Music Needs Help</h1>
                {!this.state.loggedIn ?
                    <a href="http://localhost:8888">
                        <button>Login to Spotify</button>
                    </a>
                    : <div><button onClick={() => this.getPlaylists()}>Check Your Playlists</button>
                    <button onClick={(e)=> this.logout(this.token)}>Log Out</button>
                    </div>}
                
                {this.state.playlistNames && this.state.trackNamesArr &&
                    <PlaylistList
                    usersPlaylists={this.state.playlistNames}
                    tracksObject={this.state.trackNamesArr}
                    // trackList={this.listTracksFromPlaylists()}
                    names={this.names}
                    items={this.state.items}
                    />}
                {/* {this.listTracksFromPlaylists("1ZmR4C1R0clb32v25PWzvD")} */}
            </div>
        )
    }
         
    
    
}

export default App