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
                console.log(response)
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
        console.log(this.state)
        
    }
    indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), [])


    searchForSongs(artistsNamesArr, trackNames) {
        console.log("from other function")
        // let rKellyVerdict = []
        // let chrisBrownVerdict = []
        // let mJVerdict = []

       console.log(this.indexOfAll(artistsNamesArr, "R. Kelly"))
       console.log(this.indexOfAll(artistsNamesArr, "Chris Brown"))
       console.log(this.indexOfAll(artistsNamesArr, "Michael Jackson"))

        // let mJSong = artistsNamesArr.indexOf("Michael Jackson")
        //         if (mJSong > -1) {
        //             console.log("Michael Jackson Song song here", trackNames[mJSong])
        //             mJVerdict.push(`${trackNames[mJSong]} by Michael Jackson`)
        //         }
        //         let chrisBrown = artistsNamesArr.indexOf("Chris Brown")
        //         if (chrisBrown > -1 ) {
        //             console.log("Chris Brown song here", trackNames[chrisBrown])
        //             chrisBrownVerdict.push(`${trackNames[chrisBrown]} by Chris Brown`)
        //             console.log(chrisBrownVerdict)
        //             this.setState({ chrisBrownVerdict })
        //         }
        //         let rkelly = artistsNamesArr.indexOf("R. Kelly")
        //         if (rkelly > -1) {
        //             console.log("R. Kelly song here", trackNames[rkelly])
        //             rKellyVerdict.push(`${trackNames[rkelly]} by R. Kelly`)
        //             console.log(rKellyVerdict)
        //             this.setState({rKellyVerdict})
        //         }
        
    }
    render(){
    return (
        <div className="playlist-container" style={{width: "300px", height: "350px"}}>
                <img style={{height: "220px", paddingTop:"20px" }}src={this.props.playlistInfo.images[0].url} alt="album art" />
            
            <div className="playlist-title">
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

