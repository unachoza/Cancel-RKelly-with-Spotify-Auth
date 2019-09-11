import React, {Component} from 'react'
import '../App.css'
import Songs from './Songs'
import ProblematicSongs from './ProblematicSongs'
import Spotify from 'spotify-web-api-js'

const   spotifyWebApi = new Spotify()

class PlaylistSingle extends Component {
        constructor() {
            super()
            this.state = {
                items: [],
                trackNames: [],
                artistsNamesArr: [],
                rKellyVerdict: [],
                chrisBrownVerdict: [],
                mJVerdict: []
            }
        }
    
    //getting list of tracks in User's Playlists 
    listTracksFromPlaylists(trackID) {
        // console.log('checking Songs in playlist')
        spotifyWebApi.getPlaylistTracks(trackID)
            .then((response) => {
                //saving variables of interested data points in response obj
                let trackNames = []
                let artistObjArr = []
                let artistsNamesArr = []
                let items = []
                let rKellyVerdict = []
                let chrisBrownVerdict = []
                let mJVerdict = []
              
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
                /********************
                 ****************
                 Problem: if two or more problems 
                 are by the same artist in a playlist,
                it will find one and move on 
                **********************
                ********** */ 
                let mJSong = artistsNamesArr.indexOf("Michael Jackson")
                if (mJSong > -1) {
                    console.log("Michael Jackson Song song here", trackNames[mJSong])
                }
                let chrisBrown = artistsNamesArr.indexOf("Chris Brown")
                if (chrisBrown > -1 ) {
                    console.log("Chris Brown song here", trackNames[chrisBrown])
                    chrisBrownVerdict.push(trackNames[chrisBrown])
                    console.log(chrisBrownVerdict)
                    this.setState({ chrisBrownVerdict })
                }
                let rkelly = artistsNamesArr.indexOf("R. Kelly")
                if (rkelly > -1) {
                    console.log("R. Kelly song here", trackNames[rkelly])
                    rKellyVerdict.push(trackNames[rkelly])
                    console.log(rKellyVerdict)
                    this.setState({rKellyVerdict})
                }
                let rihanna = artistsNamesArr.indexOf("Rihanna")
                if (rihanna > -1) {
                    console.log("Rihanna song here", trackNames[rihanna])
                }
                
            })
        
    }
    render(){
    return (
        <div className="playlist-container"
            style={{ display: "inline-block", padding: "14px", border: "1px solid black", borderRadius: "4px", backgroundColor: "magenta", color: "white" }}>
            <div className="playlist-title">
                 <button onClick={(e) => this.listTracksFromPlaylists( this.props.playlistInfo.id)}>List Songs</button>
                 {this.props.playlistInfo.name} 
                {this.state.items &&
                    <ProblematicSongs chrisBrownVerdict={this.state.chrisBrownVerdict} rKellyVerdict={this.state.rKellyVerdict}/>}
                   {this.state.items &&  <Songs items={this.state.items} />}
            </div>
        </div>      
    )
}
}

  

export default PlaylistSingle


