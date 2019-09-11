import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'
import Songs from './Songs'
import ProblematicSongs from './ProblematicSongs'

const   spotifyWebApi = new Spotify()

class PlaylistSingle extends Component {
        constructor() {
            super()
            this.state = {
                showSongs: true,
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
        this.state.showSongs
      ? this.setState({ showSongs: false })
      : this.setState({ showSongs: true });

        spotifyWebApi.getPlaylistTracks(trackID)
            .then((response) => {
                console.log(response.items)
                //saving variables of interested data points in response obj
                let trackNames = []
                let artistObjArr = []
                let artistsNamesArr = []
                let items = []
               response.items.map((item) => {
                    items.push(item)
                   this.setState({ items })
                   return items
                
                }) 
                response.items.map((item) => {
                    trackNames.push(item.track.name)
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
                // for (let i = 0; i < trackNames.length; i++){
                this.searchForSongs(artistsNamesArr,trackNames)
                // }
                /********************
                 ****************
                 Problem: if two or more problems 
                 are by the same artist in a playlist,
                it will find one and move on 
                **********************
                ********** */ 
               
                
            })
        
    }
    indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), [])


    searchForSongs(artistsNamesArr, trackNames) {
        console.log("from other function")
        let rKellyVerdict = []
        let chrisBrownVerdict = []
        let mJVerdict = []

        let RKindexies = this.indexOfAll(artistsNamesArr, "R. Kelly")
        let CBindexies = this.indexOfAll(artistsNamesArr, "Chris Brown")
        let MJindexies = this.indexOfAll(artistsNamesArr, "Michael Jackson")

        for (let i = 0; i < CBindexies.length; i++){
            chrisBrownVerdict.push(`${trackNames[CBindexies[i]]} by Chris Brown`)
        }
          
        for (let i = 0; i < RKindexies.length; i++){
            rKellyVerdict.push(`${trackNames[RKindexies[i]]} by R. Kelly`)
        }
          
        for (let i = 0; i < MJindexies.length; i++){
            mJVerdict.push(`${trackNames[MJindexies[i]]} by Michael Jackson`)
        }
        console.log( chrisBrownVerdict, rKellyVerdict, mJVerdict)
    }
    render(){
    return (
        <div className={this.state.showSongs ? "playlist-container-closed" : "playlist-container-open"} >
                <img style={{height: "220px", paddingTop:"20px" }}src={this.props.playlistInfo.images[0].url} alt="album art" />
            <br></br>
            <div className="playlist-container-open">
                {this.props.playlistInfo.name} <br></br>
                 <button onClick={(e) => this.listTracksFromPlaylists( this.props.playlistInfo.id)}>List Songs</button>
               
                
                {this.state.chrisBrownVerdict.length > 0 &&
                    <ProblematicSongs chrisBrownVerdict={this.state.chrisBrownVerdict} rKellyVerdict={this.state.rKellyVerdict} items={this.state.items}/>}
                   {this.state.items &&  <Songs items={this.state.items} showSongs={this.state.showSongs} />}

            </div>
            </div>
        )
    }
}



  


export default PlaylistSingle

