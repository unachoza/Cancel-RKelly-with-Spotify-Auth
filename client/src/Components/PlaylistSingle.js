import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'
import Songs from './Songs'
import ProblemRK from './ProblemRK'
import ProblemCB from './ProblemCB'
import ProblemMJ from './ProblemMJ'

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
            this.removeSongs = this.removeSongs.bind(this)
        }
    
    //getting list of tracks in User's Playlists 
    listTracksFromPlaylists(trackID) {
         console.log(trackID)
        this.state.showSongs
      ? this.setState({ showSongs: false })
      : this.setState({ showSongs: true });

        spotifyWebApi.getPlaylistTracks(trackID)
            .then((response) => {
                console.log(response)
                //saving variables of interested data points in response obj
                let uri = []
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
                response.items.map((item) => {
                    uri.push(item.track.uri)
                    return uri
                })

                
                this.searchForSongs(artistsNamesArr,trackNames)
                
            })
        
    }
    indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), [])


    searchForSongs(artistsNamesArr, trackNames) {
        let rKellyVerdict = []
        let chrisBrownVerdict = []
        let mJVerdict = []

        let RKindexies = this.indexOfAll(artistsNamesArr, "R. Kelly")
        let CBindexies = this.indexOfAll(artistsNamesArr, "Chris Brown")
        let MJindexies = this.indexOfAll(artistsNamesArr, "Michael Jackson")
        console.log("mj", MJindexies, "cb", CBindexies, "rk", RKindexies)
        for (let i = 0; i < CBindexies.length; i++){
            chrisBrownVerdict.push(`${trackNames[CBindexies[i]]} by Chris Brown  `)
        }
          
        for (let i = 0; i < RKindexies.length; i++){
            rKellyVerdict.push(`${trackNames[RKindexies[i]]} by R. Kelly  `)
        }
          
        for (let i = 0; i < MJindexies.length; i++){
            mJVerdict.push(`${trackNames[MJindexies[i]]} by Michael Jackson  `)
        }
        this.setState({chrisBrownVerdict, rKellyVerdict, mJVerdict })
    }

    removeSongs(trackID, uri, i) { 
        // spotifyWebApi.removeTracksFromPlaylist( trackID, {
        //     "tracks":
        //         { "uri": uri, "positions": [i] }
        // })
        // console.log('removed' )
    }
    render(){
    return (
        <div className={this.state.showSongs ? "playlist-container-closed" : "playlist-container-open"} >
                <img style={{height: "220px", paddingTop:"20px" }}src={this.props.playlistInfo.images[0].url} alt="album art" />
            <br></br>
            <div className="songs-in-playlist-container-open">
                {this.props.playlistInfo.name} <br></br>
                 <button onClick={(e) => this.listTracksFromPlaylists( this.props.playlistInfo.id)}>List Songs</button>
                
                {this.state.chrisBrownVerdict.length >  0 &&
                    <ProblemCB chrisBrownVerdict={this.state.chrisBrownVerdict} removeSongs={this.removeSongs()}/> }
                    {this.state.rKellyVerdict.length >  0 &&
                    <ProblemRK rKellyVerdict={this.state.rKellyVerdict} removeSongs={this.removeSongs()} />}
                {this.state.mJVerdict.length >  0 &&
                    <ProblemMJ mJVerdict={this.state.mJVerdict} removeSongs={this.removeSongs()} /> }
                   {this.state.items &&  <Songs items={this.state.items} showSongs={this.state.showSongs} />}

            </div>
        </div>
        )
    }
}



  


export default PlaylistSingle

