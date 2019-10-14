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
                mJVerdict: [], 
                MJindexies: [],
                RKindexies: [],
                CBindexies: [],
                length: [], 
                uri: []
            }
            this.removeSongs = this.removeSongs.bind(this)
        }
    
    //getting list of tracks in User's Playlists 
    listTracksFromPlaylists(playlistID) {
         console.log(playlistID)
        this.state.showSongs
      ? this.setState({ showSongs: false })
      : this.setState({ showSongs: true });

        spotifyWebApi.getPlaylistTracks(playlistID)
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
                    this.setState({uri})
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
        for (let i = 0; i < CBindexies.length; i++){
            chrisBrownVerdict.push(trackNames[CBindexies[i]])
            console.log("I have the index here, need to parse and bring to remove/problem page")
        }
          
        for (let i = 0; i < RKindexies.length; i++){
            rKellyVerdict.push(trackNames[RKindexies[i]])
            console.log("I have the index here, need to parse and bring to remove/problem page")
        }
          
        for (let i = 0; i < MJindexies.length; i++){
            mJVerdict.push(trackNames[MJindexies[i]])
            console.log("I have the index here, need to parse and bring to remove/problem page")
        }
        this.setState({ chrisBrownVerdict, rKellyVerdict, mJVerdict , MJindexies, RKindexies, CBindexies})
        this.problemLength(chrisBrownVerdict, rKellyVerdict, mJVerdict)
        console.log("this is state", this.state)
    }

    removeSongs(playlistID, uri, i) { 
        console.log('clicked' )
        
        // spotifyWebApi.removeTracksFromPlaylist( playlistID, {
        //     "tracks":
        //         { "uri": uri, "positions": [i] }
        // })
        // console.log('removed' )
    }
    problemLength(chrisBrownVerdict, rKellyVerdict, mJVerdict) {
        const length = chrisBrownVerdict.length + rKellyVerdict.length + mJVerdict.length
        this.setState({length})
        console.log("this is state.length", this.state.length)
    }
    render(){
        const { chrisBrownVerdict, rKellyVerdict, mJVerdict, showSongs, items, length, uri , MJindexies, CBindexies, RKindexies } = this.state
        const {playlistInfo} = this.props
        let buttonText = showSongs? "CHECK SONGS" : "CLOSE SONGS" 
        return (
        <div className={showSongs ? "playlist-container-closed" : "playlist-container-open"} >
                <img className="album-image" src={playlistInfo.images[0].url} alt="album art" />
            <br></br>
            <div className="songs-in-playlist-container-open">
                {playlistInfo.name} <br></br>
                 <button onClick={(e) => this.listTracksFromPlaylists( playlistInfo.id)}>{buttonText}</button>
                    {length > 0 && <div style={{ color: "darkred", fontSize: "20px", fontWeight: "300" }}>This is a problem:</div>}
                {chrisBrownVerdict.length >  0 &&
                    <ProblemCB chrisBrownVerdict={chrisBrownVerdict} CBindexies={CBindexies} playlistId={playlistInfo.id} uri={uri} removeSongs={this.removeSongs()}/> }
                    {rKellyVerdict.length >  0 &&
                    <ProblemRK rKellyVerdict={rKellyVerdict} RKindexies={RKindexies} playlistId={playlistInfo.id} uri={uri} removeSongs={this.removeSongs()} />}
                {mJVerdict.length >  0 &&
                    <ProblemMJ mJVerdict={mJVerdict} MJindexies={MJindexies} playlistId={playlistInfo.id} uri={uri} removeSongs={this.removeSongs()} /> }
                    {length > 0 && <hr></hr>}
                    {items && <Songs items={items} showSongs={showSongs} />}

            </div>
        </div>
        )
    }
}



  


export default PlaylistSingle

