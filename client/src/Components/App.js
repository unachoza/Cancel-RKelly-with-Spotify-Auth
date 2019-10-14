import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'
import PlaylistList from './PlaylistsList';
import Introduction from './Introduction';
import UsageStats from './UsageStats'

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
    logout() {
        console.log('clicked logout')
        window.location.reload()
       
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
    
    getPlaylists() {
        this.setState({items: [], playlistNames: []})
        this.increaseOffset()
        // {limit: 50, offset: 0}
        spotifyWebApi.getUserPlaylists(this.state.id, {limit: 10, offset: this.state.offsetNum})
            .then((response) => {
                console.log(response)
                this.setState({ playlistNames: response.items, total: response.total })
                // console.log(this.state.playlistNames)
            })
    }
l
    increaseOffset() {
            this.setState(state => {
            return {
                offsetNum: state.offsetNum + 10
            }
            })
            
        if (this.state.total) {
           this.stopClickingNext()
        }
      
    }
       
    
    stopClickingNext() {
        let totalClicksLeft = (Math.floor(this.state.total / 10)) - 1
        this.setState({totalClicksLeft})
    }
    

   
   
    findRKelly() {
    // rkelly id : "2mxe0TnaNL039ysAj51xPQ"
        spotifyWebApi.search("r kelly", ["artist"])
            .then((response) => {
            console.log("this is the response ", response)
        })
    }

    render() {
        const {loggedIn, offsetNum, total, playlistNames, items, trackNamesArr} = this.state
        return (
            <div className="home">
                <img style={{ height: "80px", float: "left" }} src="https://res.cloudinary.com/dh41vh9dx/image/upload/v1568208607/Spotify_Logo_CMYK_Green.png" alt="spotify logo" />
                <br></br>
                <div className=
                    {loggedIn ? "loggedIn" : "loggedOut"}>
                    <Introduction loggedIn={loggedIn}/>
                <UsageStats />
                {!loggedIn ?
                    <a href="http://localhost:8888">
                        <button>Login Spotify</button>
                    </a>
                    : <div><button className={offsetNum > 0? "hide": "showIt" }onClick={() => this.getPlaylists()}>YOUR PLAYLISTS</button>
                    {/* <button onClick={(e)=> this.logout(this.token)}>Log Out</button> */}
                        </div>}
                    </div>
                    {offsetNum < total ?
                    <button className={offsetNum > (total - 12)  ? "hide": "showIt" } onClick={() => this.getPlaylists()}>NEXT 10 PLAYLISTS</button> 
                    : " "}
                
                {playlistNames && trackNamesArr &&
                    <PlaylistList
                    usersPlaylists={playlistNames}
                    items={items}
                    />}
                {/* {this.listTracksFromPlaylists("1ZmR4C1R0clb32v25PWzvD")} */}

            </div>
        )
    }
         
    
    
}

export default App