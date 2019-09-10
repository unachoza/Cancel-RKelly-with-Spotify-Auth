import React, {Component} from 'react'
import '../App.css'
import Songs from './Songs'
import Spotify from 'spotify-web-api-js'

const   spotifyWebApi = new Spotify()

class PlaylistSingle extends Component {
        constructor() {
        super()
        this.state = {
            items: [],
            rKellyVerdict: [],
            chrisBrownVerdict: [],
            trackNames: [],
            artistsNamesArr: []
            
        }
    }
listTracksFromPlaylists(trackID) {
        // console.log('checking Songs in playlist')
        spotifyWebApi.getPlaylistTracks(trackID)
            .then((response) => {
                //saving variables of interested data points in response obj
                let trackNames = []
                let artistObjArr = []
                let artistsNamesArr = []
                let items = []
              
               response.items.map((item) => {
                    items.push(item)
                    this.setState({ items })
                    
                }) 
          response.items.map((item) => {
            trackNames.push(item.track.name)
          })
        
        response.items.map(item => {
            artistObjArr.push(item.track.artists)
        })
        artistObjArr.map((artist) => {
            artistsNamesArr.push(artist[0].name)
        })
                let mJSong = artistsNamesArr.indexOf("Michael Jackson")
                // console.log(trackNames[rKellyVerdict] , "here")
        if (mJSong > -1) {
            console.log("mJSong song here", trackNames[mJSong])
        }
            const chrisBrownVerdict = artistsNamesArr.indexOf("Chris Brown")
        if (chrisBrownVerdict > -1 ) {
            console.log("Chris Brown song here", trackNames[chrisBrownVerdict])
        }
        const rkelly = artistsNamesArr.indexOf("R. Kelly")
        if (rkelly > -1) {
            console.log("R. Kelly song here", trackNames[rkelly])
        }
        return trackNames[2]
                
            })
    // return this.trackNames[2]
        
    }
    render(){
        // console.log('hit playListSingle Componenet')
        // console.log(this.props)
    return (
        <div className="playlist-container"
            style={{ display: "inline-block", padding: "14px", border: "1px solid black", borderRadius: "4px", backgroundColor: "magenta", color: "white" }}>
            <div className="playlist-title">
                Yes Mam'  {this.props.playlistInfo.name} 
                <button onClick={(e) => this.listTracksFromPlaylists( this.props.playlistInfo.id)}>List Songs</button>
                {/* <button onclick={renderSongs()}>Show Songs</button> */}
                {this.state.items &&
                    <Songs items={this.state.items} />}
            </div>
        </div>      
    )
}
}
// const PlaylistSingle = ({ playlistInfo, tracksObject, trackList, names }) => {
    
//     }
  

export default PlaylistSingle


