import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'
import PlaylistList from './PlaylistsList';
import Introduction from './Introduction';
import UsageStats from './UsageStats'
import FollowPlaylist from './FollowPlaylist';
import axios from 'axios'


const spotifyWebApi = new Spotify()

class App extends Component {
    constructor() {
        super()
        const params = this.getHashParams()
        const token = params.access_token
        this.state = {
            loggedIn: token ? true : false,
            playListObject: "",
            trackNamesArr: [],
            offsetNum: 0,
            items: [],
            display_name: "",
            email: "",
            country: "",
            id: ''
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
        while (e = r.exec(q)) {hashParams[e[1]] = decodeURIComponent(e[2]) }
        return hashParams;
    }
    logout() {
        console.log('clicked logout')
        window.location.reload()
    }
    //From Spotify Auth
    getUserInfo() {
        spotifyWebApi.getMe()
            .then((response) => {
                this.setState({
                    display_name: response.display_name,
                    email: response.email,
                    country: response.country,
                    id: response.id
                })
            })
            .then(console.log("state", this.state))

            .then(() => {
                this.addUser()})
        
    }
    //add User to database
    addUser = () => {
        
        const time = new Date().toString()
        console.log(time)
        const {display_name, email, country} = this.state
        if(display_name){
            axios.post('http://localhost:3001/db/users', 
            {
                display_name,
                email,
                country, 
                time
            })
            .then((data) => {
                console.log('success', data)
            })
        }
    }   

    //getting list of User's Playlists: limit 50 
    getPlaylists() {
        console.log(this.state)
        let playlistOwnerId = []
        this.setState({items: [], playListObject: []})
        this.increaseOffset()
        // {limit: 50, offset: 0}
        console.log('ofset inside func', this.state.id)
        spotifyWebApi.getUserPlaylists(this.state.id, {limit: 20, offset: this.state.offsetNum})
            .then((response) => {
                console.log(response.items)
                this.setState({ playListObject: response.items, total: response.total })
            })
            .then(() => {

                this.state.playListObject.map((item) => {
                    playlistOwnerId.push(item.owner.id)
                })
                return playlistOwnerId
            })
            .then(() => {
                this.setState({playlistOwnerId})
            })
            .then(() => {
                console.log(this.state.playlistOwnerId)
            })
    }

    increaseOffset() {
        console.log('offset num ', this.state)
            this.setState(state => {
            return { offsetNum: state.offsetNum + 20 }
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
       
        const {loggedIn, offsetNum, total, playListObject, items, trackNamesArr, playlistOwnerId, id} = this.state
        return (
            <div className="home">
                {/* {display_name? this.addUser() : ''} */}
                <img style={{ height: "80px", float: "left" }} src="https://res.cloudinary.com/dh41vh9dx/image/upload/v1568208607/Spotify_Logo_CMYK_Green.png" alt="spotify logo" />
                <br></br>
            
                <div className=
                    {loggedIn ? "loggedIn" : "loggedOut"}>

                <Introduction loggedIn={loggedIn}/>
                <UsageStats />
                <FollowPlaylist />
                 {!loggedIn ?
                    <a href="http://localhost:8888">
                        <button>Login Spotify</button>
                    </a>
                    : <div><button className={offsetNum > 0? "hide": "showIt" }onClick={() => this.getPlaylists()}>YOUR PLAYLISTS</button>
                        </div>}
                    </div>
                    {offsetNum < total ?
                    <button className={offsetNum > (total - 12)  ? "hide": "showIt" } onClick={() => this.getPlaylists()}>NEXT 10 PLAYLISTS</button> 
                    : " "}
                
                {playListObject && trackNamesArr &&
                    <PlaylistList
                    usersPlaylists={playListObject}
                    playlistOwnerId={playlistOwnerId}
                    items={items}
                    CurrentUserid={id}
                    />} 
                {/* {this.listTracksFromPlaylists("1ZmR4C1R0clb32v25PWzvD")} */}

            </div>
        )
    }
         
    
    
}

export default App